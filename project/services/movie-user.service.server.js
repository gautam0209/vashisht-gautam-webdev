var app = require('../../express');

var q = require('q');

var userProjModel = require('../models/user/user.model.server');
// var reviewModel = require('../models/review/review.model.server');

var passport = require('passport');

var bcrypt = require("bcrypt-nodejs");

var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos', 'email']
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);



// var users =             [
//     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
//     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
//     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
// ];

app.post('/api/assignment/graduate/user', isAdmin, createUser);
app.get('/api/project/admin/users', isAdmin, findAllUsers);

app.put('/api/project/user', updateProfile);



app.get('/api/assignment/graduate/user/:userId', findUserById);
app.put('/api/assignment/graduate/user/:userId', isAdmin, updateUser);
app.delete('/api/assignment/graduate/user/:userId', isAdmin, deleteUser);

app.get('/api/assignment/graduate/user', findUserByUsername);

app.post('/api/project/graduate/login', passport.authenticate('local'), login);
app.post('/api/assignment/graduate/logout', logout);


app.get   ('/api/assignment/graduate/loggedin', loggedin);
app.get   ('/api/project/admin', checkAdmin);

app.post  ('/api/assignment/graduate/register', register);
app.post  ('/api/assignment/graduate/unregister', unregister);



app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/index.html#!/login',
        failureRedirect: '/project/index.html#!/login'
    }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/index.html#!/login',
        failureRedirect: '/project/index.html#!/login'
    }));
app.get('/api/user/:userId/movie/:movieId/like', isLike);
app.post('/api/user/:userId/movie/:movieId/like', likeMovie);
app.post('/api/user/:userId/movie/:movieId/unlike', unLikeMovie);
app.get('/api/user/:userId/movie/:movieId/watch', isWatch);
app.post('/api/user/:userId/movie/:movieId/watch', watchMovie);
app.post('/api/user/:userId/movie/:movieId/unwatch', unWatchMovie);
app.post('/api/user/:userId/follow/:expertId', follow);


function follow(req, res)
{
    var userId = req.params['userId'];
    var expertId = req.params['expertId'];
    userProjModel
        .follow(userId, expertId)
        .then(function()
        {
            res.sendStatus(200);
        }, function(){
            res.sendStatus(404);
        })
}

function unWatchMovie(req, res)
{
    var userId = req.params['userId'];
    var movieId = req.params['movieId'];
    userProjModel
        .unWatchMovie(userId, movieId)
        .then(function(watch){
            if(watch)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        }, function(){
            res.sendStatus(404)
        })
}

function watchMovie(req, res)
{
    var userId = req.params['userId'];
    var movieId = req.params['movieId'];
    userProjModel
        .watchMovie(userId, movieId)
        .then(function(watch){
            if(watch)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        }, function(){
            res.sendStatus(404)
        })
}



function isWatch(req, res)
{

    var userId = req.params['userId'];
    var movieId = req.params['movieId'];
    userProjModel
        .isWatch(userId, movieId)
        .then(function(watch){
            if(watch)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        }, function(){
            res.sendStatus(404)
        })
}




function unLikeMovie(req, res)
{
    var userId = req.params['userId'];
    var movieId = req.params['movieId'];
    userProjModel
        .unLikeMovie(userId, movieId)
        .then(function(like){
            if(like)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        }, function(){
            res.sendStatus(404)
        })
}

function likeMovie(req, res)
{
    var userId = req.params['userId'];
    var movieId = req.params['movieId'];
    userProjModel
        .likeMovie(userId, movieId)
        .then(function(like){
            if(like)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        }, function(){
            res.sendStatus(404)
        })
}



function isLike(req, res)
{

    var userId = req.params['userId'];
    var movieId = req.params['movieId'];
    userProjModel
        .isLike(userId, movieId)
        .then(function(like){
            if(like)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        }, function(){
            res.sendStatus(404)
        })
}


function addReview(req, res)
{
    var userObj = req.body;

    //var userId = req.params['userId'];
    var userId = userObj.userId;
     userProjModel.findById(userId)
         .then(function(user)
         {
             user.movieId = userObj.movieId;
             userProjModel.updateUser(userId,user)
                 .then(function(){
                         res.sendStatus(200)
                     },
                     function(){
                         res.sendStatus(404)
                     });
         })
}

function facebookStrategy(token, refreshToken, profile, done) {
    userProjModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newFacebookUser = {
                        username:  emailParts[0],
                        firstName: profile.displayName.split(" ")[0],
                        lastName:  profile.displayName.split(" ")[1],
                        email:     email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userProjModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}


function googleStrategy(token, refreshToken, profile, done) {
    userProjModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userProjModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}



function unregister(req,res)
{
    userProjModel
        .deleteUser(req.user._id)
        .then(function (user) {
            req
                .logout();
            res.sendStatus(200);
        });
}


function isAdmin(req,res,next)
{
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1)
        next();
    else
        res.sendStatus(401);
}

function register(req, res) {
    console.log("I am here");
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userProjModel
        .createUser(userObj)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        });
}

function createUser(req, res){
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userProjModel.createUser(user)
        .then(function(user){
                res.json(user);
            },
            function(err){
                res.send(err);
            });
}

function logout(req, res){
    req.logout();
    res.sendStatus(200);
}

function localStrategy(username, password, done) {
    // userProjModel
    //     .findUserByCredentials(username, password)
    //     .then(
    //         function(user) {
    //             if (!user) { return done(null, false); }
    //             return done(null, user);
    //         },
    //         function(err) {
    //             if (err) { return done(err); }
    //         }
    //     );

    userProjModel
        .findUserByUsername(username)
        .then(
            function(user) {
                // if the user exists, compare passwords with bcrypt.compareSync
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });

}

function loggedin(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function checkAdmin(req, res) {
    console.log(req.user);
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function login(req, res)
{
    res.json(req.user);
}

function deleteUser(req, res) {
     var userId = req.params['userId'];
    //var userId = req.user._id;

    console.log("deleting user");
    console.log(req.user);

    userProjModel.deleteUser(userId)
        .then(function(){
            res.sendStatus(200)
        },
        function(){
            res.sendStatus(404)
        });
}


function updateUser(req, res)
{
    var user = req.body;
    var userId = req.params['userId'];

    userProjModel.updateUser(userId,user)
        .then(function(){
                res.sendStatus(200)
            },
            function(){
                res.sendStatus(404)
            });
}


function updateProfile(req, res)
{
    var user = req.body;
    //var userId = req.params['userId'];
    var userId = req.user._id;
    console.log(user.password);

    userProjModel.findUserById(userId)
        .then(function(oUser){
            if(oUser.password !== user.password)
                user.password = bcrypt.hashSync(user.password);
            userProjModel.updateUser(userId,user)
                .then(function(){
                        res.sendStatus(200)
                        console.log(user.password);

                    },
                    function(){
                        res.sendStatus(404)
                    });
        })

}

function findUserById(req, res)
{
    var userId = req.params['userId'];

    userProjModel.
        findUserById(userId)
        .then(function(user)
        {
            if(user)
                res.send(user);
            else
                res.sendStatus(404);
        },
        function()
        {
            res.sendStatus(404);
        });

}

function findUserByCredential(req,res){
    var username = req.query['username'];
    var password = req.query['password'];

    userProjModel.findUserByCredentials(username,password)
        .then(function(user){
            if(user)
                res.json(user);
            else
                res.sendStatus(404);
            },
            function(){
                res.sendStatus(404);
            });

}

function findUserByUsername(req, res)
{
    var username = req.query['username'];

    console.log("hello12");

    userProjModel.findUserByUsername(username)
        .then(function(user){
            if(user)
                res.json(user);
            else
                res.sendStatus(404);
        },
        function(){
            res.sendStatus(404);
        });
}

function findAllUsers(req, res){
    var username = req.query['username'];
    var password = req.query['password'];

        if(username && password)
        {
                findUserByCredential(req,res);
        }
        else if(username)
        {
                findUserByUsername(req, res);
        }
      else
        userProjModel.findAllUsers()
            .then(function(users){
                if(users)
                    res.send(users);
                else
                    res.sendStatus(404);
            },
            function(){
                res.sendStatus(404);
            })
}



function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userProjModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}



