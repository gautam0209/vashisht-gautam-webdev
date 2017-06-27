var mongoose = require('mongoose');

var userProjSchema = require('./user.schema.server');
var userProjModel = mongoose.model('userProjModel', userProjSchema);

var q = require('q');

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
    userProjModel.isLike = isLike;
    userProjModel.likeMovie = likeMovie;
    userProjModel.unLikeMovie = unLikeMovie;
    userProjModel.isWatch = isWatch;
    userProjModel.watchMovie = watchMovie;
    userProjModel.unWatchMovie = unWatchMovie;
    userProjModel.follow = follow;
    userProjModel.findRequests = findRequests;

module.exports = userProjModel;



function findRequests()
{
    return userProjModel
        .find({status:'WAITING'});
}

function follow(userId, expertId)
{
     userProjModel
        .findById(userId)
        .then(function(user)
        {
            user.follow.push(expertId);
            userProjModel
                .updateUser(userId, user)
                .then(function(){

                })
        })

    return   userProjModel
        .findById(expertId)
        .then(function(expert)
        {
            expert.followers.push(userId);
            userProjModel
                .updateUser(expertId, expert)
                .then(function(){})
        })
}

function unWatchMovie(userId, movieId)
{
    return userProjModel
        .findById(userId)
        .then(function(user) {
            var index = user.movieWatched.indexOf(movieId);

            user.movieWatched.splice(index, 1);

            return user.save();
        })
}

function watchMovie(userId, movieId)
{
    return userProjModel
        .findById(userId)
        .then(function(user) {
            user.movieWatched.push(movieId);
            return user.save();
        })
}
function isWatch(userId, movieId)
{
    var prom = q.defer();
    return userProjModel
        .findById(userId)
        .then(function(user){
            var moviesWatched = user.movieWatched;
            for(var m in moviesWatched)
            {
                var movie = moviesWatched[m];
                if(movie == movieId){
                    return q.resolve(user);
                }
            }
        })

    return q.promise;
}



function unLikeMovie(userId, movieId)
{
    return userProjModel
        .findById(userId)
        .then(function(user) {
            var index = user.movieLiked.indexOf(movieId);

            user.movieLiked.splice(index, 1);

            return user.save();
        })
}

    function likeMovie(userId, movieId)
    {
     return userProjModel
            .findById(userId)
            .then(function(user) {
                user.movieLiked.push(movieId);
                return user.save();
            })
    }
function isLike(userId, movieId)
{
    var prom = q.defer();
    return userProjModel
        .findById(userId)
        .then(function(user){
            var moviesLiked = user.movieLiked;
            for(var m in moviesLiked)
            {
                var movie = moviesLiked[m];
                if(movie == movieId){
                    return q.resolve(user);
                }
            }
        })

    return q.promise;
}


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
        user.follow = [];
        user.followers = [];
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
        return userProjModel.update({_id: userId}, {$set: newUser});
    }

    function deleteUser(userId) {
        return userProjModel.remove({_id: userId});
    }