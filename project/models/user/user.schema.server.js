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
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "reviewModel"}],
    roles: [{type: String,
            default: 'USER',
            enum: ['USER','FACULTY', 'STUDENT', 'ADMIN' ]}],
    dateCreated: {type: Date, default: Date.now},
        google: {
            id:    String,
            token: String
        },
    facebook: {
        id:    String,
        token: String
    }
}, {collection: "user"});

module.exports = userSchema;