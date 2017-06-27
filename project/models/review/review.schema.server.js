var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
    author:String,
    content:String,
    movieId: Number,
    movieTitle: String,
    moviePosterPath: String,
    star: {type: Boolean,
            default: false},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "review"});

module.exports = reviewSchema;