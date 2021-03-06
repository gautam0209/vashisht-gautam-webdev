var app = require('../../express');

var q = require('q');
var request=require('request');
var userProjModel = require('../models/user/user.model.server');

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


app.post('/api/project/user', isAdmin, createUser);
app.get('/api/project/admin/users', isAdmin, findAllUsers);

app.put('/api/project/user', updateProfile);



app.get('/api/project/user/:userId', findUserById);
app.put('/api/project/user/:userId', isAdmin, updateUser);
app.delete('/api/project/user/:userId', isAdmin, deleteUser);

app.get('/api/project/user', findUserByUsername);

app.post('/api/project/graduate/login', passport.authenticate('local'), login);
app.post('/api/project/logout', logout);


app.get   ('/api/project/loggedin', loggedin);
app.get   ('/api/project/admin', checkAdmin);

app.post  ('/api/project/register', register);
app.post  ('/api/project/unregister', unregister);



app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/index.html#!',
        failureRedirect: '/project/index.html#!/login'
    }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/index.html#!',
        failureRedirect: '/project/index.html#!/login'
    }));
app.get('/api/user/:userId/movie/:movieId/like', isLike);
app.post('/api/user/:userId/movie/:movieId/like', likeMovie);
app.post('/api/user/:userId/movie/:movieId/unlike', unLikeMovie);
app.get('/api/user/:userId/movie/:movieId/watch', isWatch);
app.post('/api/user/:userId/movie/:movieId/watch', watchMovie);
app.post('/api/user/:userId/movie/:movieId/unwatch', unWatchMovie);
app.post('/api/user/:userId/follow/:expertId', follow);
app.post('/api/user/:userId/unFollow/:expertId', unFollow);
app.get('/api/project/requests', findRequests);
app.post('/api/project/setTrace/:trace', setProfileTrace);
app.get('/api/project/getTrace', getProfileTrace);
app.post('/api/project/setPath/:path', setPath);
app.get('/api/project/getPath', getPath);

app.get('/api/project/search/movie/:movieName', searchMovie);
app.get('/api/project/currentMovies', currentMovies);
app.get('/api/project/popularMovies', popularMovies);
app.get('/api/project/upcomingMovies', upcomingMovies);
app.get('/api/project/reviews/movie/:movieId', getReviews);
app.get('/api/project/find/movie/:movieId', getMovie);



var key = "56ebcfaec1cf2e96e005ccf98f7feeb6";
var urlBase = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=mvName";
var urlBaseCur = "https://api.themoviedb.org/3/movie/now_playing?api_key="+ key + "&language=en-US";
var urlBasePop = "https://api.themoviedb.org/3/movie/popular?api_key="+key+"&language=en-US";
var urlBaseUp = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + key + "&language=en-US";
var urlBaseRev = "https://api.themoviedb.org/3/movie/ID/reviews?api_key=" + key;
var urlById = "https://api.themoviedb.org/3/movie/ID?api_key=" + key + "&append_to_response=credits&language=en-US";



var path = {
    text: ''
};

var profileTrace = {
    text : ''
};

function getMovie(req, res)
{
    var movieId = req.params['movieId'];
    var url = urlById.replace('ID',movieId);
    request.get(url, function (error, response, body) {
        if(error){
            res.sendStatus(404);
        }
        else{
            res.json(body);
        }});
}

function currentMovies(req, res)
{
    request.get(urlBaseCur, function (error, response, body) {
        if(error){
            res.sendStatus(404);
        }
        else{
            res.json(body);
        }});
}

function popularMovies(req, res)
{
    request.get(urlBasePop, function (error, response, body) {
        if(error){
            res.sendStatus(404);
        }
        else{
            res.json(body);
        }});
}

function upcomingMovies(req, res)
{
    request.get(urlBaseUp, function (error, response, body) {
        if(error){
            res.sendStatus(404);
        }
        else{
            res.json(body);
        }});
}

function searchMovie(req, res)
{
    var movieName = req.params['movieName'];
    var url = urlBase.replace('mvName',movieName);
    request.get(url, function (error, response, body) {
        if(error){
            res.sendStatus(404);
        }
        else{
            res.json(body);
        }});
}

function getReviews(req, res)
{
    var movieId = req.params['movieId'];
    var url = urlBaseRev.replace('ID',movieId);
    request.get(url, function (error, response, body) {
        if(error){
            res.sendStatus(404);
        }
        else{
            res.json(body);
        }});
}

function setPath(req, res)
{
    path.text = req.params['path'];
    res.sendStatus(200);
}


function getPath(req, res)
{
    res.json(path);
}

function setProfileTrace(req, res)
{
    profileTrace.text = req.params['trace'];
    res.sendStatus(200);
}


function getProfileTrace(req, res)
{
    res.json(profileTrace);
}


function findRequests(req, res)
{
    userProjModel
        .findRequests()
        .then(function(requests)
        {
            res.json(requests);
        }, function(){
            res.sendStatus(404);
        })
}



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

function unFollow(req, res)
{
    var userId = req.params['userId'];
    var expertId = req.params['expertId'];
    userProjModel
        .unFollow(userId, expertId)
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
                        password: bcrypt.hashSync('default'),
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
                        password: bcrypt.hashSync('default'),
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
    var userId = req.user._id;

    userProjModel.findUserById(userId)
        .then(function(oUser){
            if(oUser.password !== user.password)
                user.password = bcrypt.hashSync(user.password);
            userProjModel.updateUser(userId,user)
                .then(function(){
                        res.sendStatus(200)

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



