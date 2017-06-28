var app = require('../../express');

var q = require('q');

var reviewModel = require('../models/review/review.model.server');
var userProjModel = require('../models/user/user.model.server');



app.post  ('/api/project/review', addReview);
app.put  ('/api/project/review', updateReview);
app.delete  ('/api/project/user/:userId/review/:reviewId', deleteReview);

app.get   ('/api/movie/:movieId/localReview', getLocalReviews);
app.get('/api/project/admin/reviews', isAdmin, findAllReviews);

app.get ('/api/user/:userId/allReviews', findAllReviewsForUserId);

app.get ('/api/project/follow/:followId', findAllReviewsByFollow);



function findAllReviewsByFollow(req, res)
{
    var followId = req.params['followId'];

    reviewModel.findAllReviewsByFollow(followId)
        .then(function(reviews){
            res.json(reviews);
        }, function() {
            res.sendStatus(404);
        });
}

function deleteReview(req, res)
{
    var reviewId = req.params['reviewId'];
    var userId = req.params['userId'];
    reviewModel.deleteReview(userId, reviewId)
        .then(function(){
            res.sendStatus(200);
        }, function(){
            res.sendStatus(404);
        })
}

function updateReview(req, res)
{
    var review = req.body;
    reviewModel
        .updateReview(review)
        .then(function(){
            res.sendStatus(200);
        }, function(){
            res.sendStatus(404);
        })
}

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

function findAllReviewsForUserId(req, res){
    var userId = req.params['userId'];
    reviewModel.findAllReviewsForUserId(userId)
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
    var reviewObj = req.body;

    // var prom = q.defer();
    reviewModel
        .addReview(reviewObj)
        .then(function(reviewObj){
            // q.resolve(reviewObj);
            res.json(reviewObj);
        },function(){
            // q.reject();
            res.sendStatus(404);
        });

    // return prom.promise;
}