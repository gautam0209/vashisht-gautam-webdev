var mongoose = require('mongoose');

var userProjSchema = require('./user.schema.server');
var userProjModel = mongoose.model('userProjModel', userProjSchema);

    userProjModel.createUser = createUser;
    userProjModel.findUserById = findUserById;
    userProjModel.findAllUsers = findAllUsers;
    userProjModel.findUserByUsername = findUserByUsername;
    userProjModel.findUserByCredentials = findUserByCredentials;
    userProjModel.updateUser = updateUser;
    userProjModel.deleteUser = deleteUser;
    userProjModel.deleteWebsite = deleteWebsite;
    userProjModel.addWebsite = addWebsite;
    userProjModel.findUserByGoogleId = findUserByGoogleId;
    userProjModel.findUserByFacebookId = findUserByFacebookId;
    userProjModel.addReview = addReview;
    module.exports = userProjModel;


function findUserByFacebookId(facebookId) {
    return userProjModel
        .findOne({'facebook.id': facebookId});
}

    function findUserByGoogleId(googleId) {
        return userProjModel
                .findOne({'google.id': googleId});
    }



    function deleteWebsite(userId, websiteId) {

        return userProjModel
            .findById(userId)
            .then(function (user) {

                var index = user.websites.indexOf(websiteId);

                user.websites.splice(index, 1);

                return user.save();
            });
    }

    function addWebsite(userId, websiteId) {
        return userProjModel
            .findById(userId)
            .then(function (user) {
                user.websites.push(websiteId);
                return user.save();
            });
    }

    function addReview(reviewId, userId)
    {
        return userProjModel
            .findById(userId)
            .then(function (user) {
                user.reviews.push(reviewId);
                return userProjModel.update({_id: userId}, {$set: user});
            });
    }

    function createUser(user) {
        if(user.roles)
            user.roles = user.roles.split(",");
        else
            user.roles =['USER'];
        return userProjModel
                .create(user);
    }

    function findUserById(userId) {
        return userProjModel.findById(userId);
    }

    function findAllUsers() {
        return userProjModel.find();
    }

    function findUserByUsername(username) {
        return userProjModel.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return userProjModel
            .findOne({username: username, password: password});
    }

    function updateUser(userId, newUser) {
        delete newUser.username;
        delete newUser.password;
        return userProjModel.update({_id: userId}, {$set: newUser});
    }

    function deleteUser(userId) {
        return userProjModel.remove({_id: userId});
    }