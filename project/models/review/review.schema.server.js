var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
    content:String,
    movieId: Number,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "review"});

module.exports = reviewSchema;