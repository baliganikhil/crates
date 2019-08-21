'use strict'
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()
const router = express.Router()

const LevelAPI = require('./routes/level');

app.set('view engine', 'pug')

if (process.env.NODE_ENV === 'test') {
  // NOTE: aws-serverless-express uses this app for its integration tests
  // and only applies compression to the /sam endpoint during testing.
  router.use('/sam', compression())
} else {
  router.use(compression())
}

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext())

// NOTE: tests can't find the views directory without this
app.set('views', path.join(__dirname, 'views'))

router.get('/', (req, res) => {
  res.render('index', {
    apiUrl: req.apiGateway ? `https://${req.apiGateway.event.headers.Host}/${req.apiGateway.event.requestContext.stage}` : 'http://localhost:3000'
  })
})

let authenticator = (req, res, next) => {
  console.log('I am in authenticator');

  if (!req.headers['x-auth']) {
    res.status(401);
    res.send('Unauthorised call!');
    return;
  }
  // TODO: Replace the hardcoded userId with actual userId
  // Using FB login code
  req.userId = 'bhavi';
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
