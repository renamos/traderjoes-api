var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    city: String,
    state: String
});

module.exports = mongoose.model('users', userSchema);