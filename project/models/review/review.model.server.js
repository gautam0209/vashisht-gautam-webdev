var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('reviewModel', reviewSchema);

var q = require('q');

 var userModel = require('../user/user.model.server');


// api
    reviewModel.findAllReviews = findAllReviews;
    reviewModel.findAllReviewsForUserId = findAllReviewsForUserId;
    reviewModel.updateReview = updateReview;
    reviewModel.deleteReview = deleteReview;
    reviewModel.addReview = addReview;
    reviewModel.getLocalReviews = getLocalReviews;
    reviewModel.findAllReviewsByFollow = findAllReviewsByFollow;



module.exports = reviewModel;


function deleteReview(userId, reviewId)
{
    userModel
        .findUserById(userId)
        .then(function(user)
        {
            var index = user.reviews.indexOf(reviewId);

            user.reviews.splice(index, 1);
            userModel.updateUser(userId, user)
                .then(function(){})
        });


    return reviewModel.remove({_id: reviewId});
}

function getLocalReviews(movieId)
{
    var prom = q.defer();
    reviewModel
        .find({movieId:movieId})
        .then(function(reviews){
            prom.resolve(reviews);
        })

    return prom.promise;
}

function findAllReviews() {
    return reviewModel.find();
}

function updateReview(review)
{
    return reviewModel
        .update({_id: review._id}, {$set:review});
}

function findAllReviewsForUserId(userId) {
    return reviewModel.find({_user:userId});
}

function findAllReviewsByFollow(followId)
{

     return reviewModel.find({_user:followId});
}

    function addReview(userObj)
    {
        var prom = q.defer();

        userModel
            .findUserById(userObj.userId)
            .then(function(user)
            {
                var review = {
                    _user: userObj.userId,
                    movieId : userObj.movieId,
                    movieTitle: userObj.movieTitle,
                    moviePosterPath:userObj.moviePosterPath,
                    content: userObj.review,
                    author: user.username
                };

                if(user.roles.indexOf('EXPERT')>-1)
                    review.star = true;

                reviewModel
                    .create(review)
                    .then(function (review) {
                        userModel
                            .addReview(review._id, review._user)
                            .then(function(){
                                prom.resolve(review);
                            })
                    },function(err){
                        console.log(err);
                    })
            })

        return prom.promise;
    }