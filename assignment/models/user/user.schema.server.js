var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/webdev_summer1_2017');
mongoose.Promise = require('q').Promise;

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "websiteModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;