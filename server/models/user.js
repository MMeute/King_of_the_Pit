var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var{ showSchema } = require('./show')
// var{ conversationSchema }= require('./conversation')


var userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1
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
        required: true,
        minlength: 6,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    cellNumber: {
        type: String,
        required: true,
    },
    alternateNumber: String,
    dob: Date,
    address1: {
        type: String,
        required: true
    },
    address2: String,
    city: String,
    state: String,
    zip: String,
    pitPoints: Number,
    genre: String,
    pastShows: [],//showSchema
    conversations: []//messageSchema
},
{
    timestamps: true
})

userSchema.pre('save', function(next) {
    var user = this

    if(user.isModified('password')) {
        bcrypt.genSalt(10, function(err, salt) {
            user.password = hash;
            next();
        })
    }
    else {
        next();
    }
})

var User = mongoose.model('User', userSchema)
module.exports = { User, userSchema }