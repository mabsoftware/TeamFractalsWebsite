var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
    from: String,
    subject: String,
    message: String
});

module.exports = mongoose.model('contact', contactSchema);
