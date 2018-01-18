var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        maxlength: 16
    },
    password: {
        type: String,
        required: true
    }
})

var User = mongoose.model('User', userSchema)

module.exports = { User }