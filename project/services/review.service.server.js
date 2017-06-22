var app = require('../../express');

var q = require('q');

var reviewModel = require('../models/review/review.model.server');


app.post  ('/api/project/review', addReview);
app.get   ('/api/movie/:movieId/localReview', getLocalReviews);


// var pages = [
//     { "_id": "321", "name": "Post 1", "websiteId": "789", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "789", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "789", "description": "Lorem" }
// ];

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