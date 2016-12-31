var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    name: String,
    rank: String,
    manualcapabilities: String,
    autonomouscapabilities: String,
    autonomousstrategy: String,
    endgamestrategy: String,
});

module.exports = mongoose.model('Team', teamSchema);
