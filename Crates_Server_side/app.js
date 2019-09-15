'use strict'
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()
const router = express.Router()
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const session = require('cookie-session')
const cookieParser = require('cookie-parser')
const config = require('./configuration/config')
const LevelAPI = require('./routes/level')
const loginAPI = require('./routes/login')

app.set('view engine', 'ejs')

if (process.env.NODE_ENV === 'test') {
  // NOTE: aws-serverless-express uses this app for its integration tests
  // and only applies compression to the /sam endpoint during testing.
  router.use('/sam', compression())
} else {
  router.use(compression())
}

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
  clientID: config.facebook_api_key,
  clientSecret:config.facebook_api_secret,
  callbackURL: config.callback_url,
  enableProof: true,
  profileFields: ['id', 'displayName', 'photos', 'email']
},

function(accessToken, refreshToken, profile, done) {
  profile.accessToken = accessToken;
  profile.refreshToken = refreshToken;
  return done(null, profile);
}
));

router.use(cookieParser('mySecretKey'))
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(session({ secret: 'mySecretKey'}))
router.use(passport.initialize())
router.use(passport.session())
router.use(cors())
router.use(awsServerlessExpressMiddleware.eventContext())

// NOTE: tests can't find the views directory without this
app.set('views', path.join(__dirname, 'views'))

router.get('/', loginAPI.loadHomePage);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }, {session:'true'}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', 
  { successRedirect : '/',  
    failureRedirect: '/login', 
    failureFlash: 'Invalid username or password.' 
  }),
  loginAPI.redirectToHomePage);

router.get('/logout', loginAPI.logout);

router.get('/login', loginAPI.login);

let authenticator = (req, res, next) => {
  console.log('I am in authenticator');

  if (!req.isAuthenticated()) {
    res.status(401);
    res.send({err: true, data: 'Unauthorised call!'});
    return;
  }

  next();
};

router.get('/api/v1/level/:game/:difficulty/:createdBy/:createdAt', authenticator, LevelAPI.getLevel);
router.get('/api/v1/levels/:game', authenticator, LevelAPI.getAllLevels);
router.get('/api/v1/levels/:game/:difficulty', authenticator, LevelAPI.getLevelsOfReqDifficulty);
router.post('/api/v1/level/:game/save', authenticator, LevelAPI.saveLevel);
router.delete('/api/v1/level/:game/delete/:difficulty/:createdAt', authenticator, LevelAPI.deleteLevel);

// The aws-serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)
app.use('/', router)

// Export your express server so you can import it in the lambda function.
module.exports = app
