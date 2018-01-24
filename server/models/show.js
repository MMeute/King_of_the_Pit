var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({
    date: Date,
    time: Date,
    subgenre: String,
    venueName: String,
    city: String,
    address: String,
    pointValue: Number,
    img: String
}, {
    timestamps: true
})

var Show = mongoose.model('Show', showSchema)
module.exports = { Show, showSchema }
