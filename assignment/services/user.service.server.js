var app = require('../../express');

var userModel = require('../models/user/user.model.server');

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);



// var users =             [
//     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
//     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
//     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
// ];

app.post('/api/assignment/graduate/user', createUser);
app.get('/api/assignment/graduate/user', findAllUsers);

app.get('/api/assignment/graduate/user/:userId', findUserById);
app.put('/api/assignment/graduate/user/:userId', updateUser);
app.delete('/api/assignment/graduate/user/:userId', deleteUser);


app.post('/api/assignment/graduate/login', passport.authenticate('local'), login);
app.post('/api/assignment/graduate/logout', logout);


app.get   ('/api/assignment/graduate/loggedin', loggedin);
app.post  ('/api/assignment/graduate/register', register);


function register(req, res) {
    var userObj = req.body;
    userModel
        .createUser(userObj)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        });
}

function logout(req, res){
    req.logout();
    res.sendStatus(200);
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );

}

function loggedin(req, res) {
    console.log(req.user);
    if(req.isAuthenticated()) {
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

    userModel.deleteUser(userId)
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

    userModel.updateUser(userId,user)
        .then(function(){
                res.sendStatus(200)
            },
            function(){
                res.sendStatus(404)
            });
}

function findUserById(req, res)
{
    var userId = req.params['userId'];

    userModel.
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

    userModel.findUserByCredentials(username,password)
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

    userModel.findUserByUsername(username)
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
        userModel.findAllUsers()
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

function createUser(req, res){
    var user = req.body;
    userModel.createUser(user)
        .then(function(user){
                res.json(user);
        },
        function(err){
            res.send(err);
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
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