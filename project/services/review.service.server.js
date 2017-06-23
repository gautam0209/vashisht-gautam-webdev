var app = require('../../express');

var q = require('q');

var reviewModel = require('../models/review/review.model.server');


app.post  ('/api/project/review', addReview);
app.get   ('/api/movie/:movieId/localReview', getLocalReviews);
app.get('/api/project/admin/reviews', isAdmin, findAllReviews);



// var pages = [
//     { "_id": "321", "name": "Post 1", "websiteId": "789", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "789", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "789", "description": "Lorem" }
// ];


function isAdmin(req,res,next)
{
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1)
        next();
    else
        res.sendStatus(401);
}

function findAllReviews(req, res){
        reviewModel.findAllReviews()
            .then(function(reviews){
                    if(reviews)
                        res.send(reviews);
                    else
                        res.sendStatus(404);
                },
                function(){
                    res.sendStatus(404);
                })
}

function getLocalReviews(req, res)
{

    var movieId = req.params['movieId'];
    reviewModel
        .getLocalReviews(movieId)
        .then(function(reviews){
            res.json(reviews);
        })
}

function addReview(req, res)
{
    var userObj = req.body;
    console.log("hi");
    console.log(userObj);
    var prom = q.defer();
    reviewModel
        .addReview(userObj)
        .then(function(userObj){
            q.resolve(userObj);
        });

    return prom.promise;
}