var mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;


var userProjSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "reviewModel"}],
    movieLiked: [{type: Number}],
    movieWatched: [{type: Number}],
    follow: [{type: mongoose.Schema.Types.ObjectId, ref: "reviewModel"}],
    followers : [{type: mongoose.Schema.Types.ObjectId, ref: "reviewModel"}],
    status: {type: String,
            enum: ['WAITING','APPROVED', 'REJECTED']},
    roles: {type:String,
            default:'USER',
        enum: ['USER','EXPERT', 'ADMIN' ]},
    dateCreated: {type: Date, default: Date.now},
        google: {
            id:    String,
            token: String
        },
    facebook: {
        id:    String,
        token: String
    }
}, {collection: "userProj"});

module.exports = userProjSchema;