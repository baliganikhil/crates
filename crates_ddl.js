var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crates');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var player_schema = mongoose.Schema({
    player: String,
    total_solved: Number
});

var level_schema = mongoose.Schema({
    name: String,
    matrix: [],
    rating: Number,
    num_ratings: Number,
    sum_ratings: Number,
    created_at: {type: Date, default: Date.now},
    created_by: String
});

var solved_schema = mongoose.Schema({
    level_id: mongoose.Schema.Types.ObjectId,
    solved_by: String
});

var Player = mongoose.model('Player', player_schema);
var Level = mongoose.model('Level', level_schema);
var SolvedLevels = mongoose.model('SolvedLevels', solved_schema);
