var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    name: String,
    subject: String,
    message: String,
    isApproved: Boolean
});

module.exports = mongoose.model('Comment', commentSchema);
