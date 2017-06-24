var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('reviewModel', reviewSchema);

var q = require('q');

 var userModel = require('../user/user.model.server');


// api
    reviewModel.findAllReviews = findAllReviews;
//     //reviewModel.createPage = createPage;
//     reviewModel.findPageById = findPageById;
//     reviewModel.findAllPagesForWebsite = findAllPagesForWebsite;
//     //reviewModel.deletePageFromWebsite = deletePageFromWebsite;
//     reviewModel.deletePage = deletePage;
//     reviewModel.updatePage = updatePage;
//     reviewModel.addWidget = addWidget;
//     reviewModel.deleteWidget = deleteWidget;
    reviewModel.addReview = addReview;
    reviewModel.getLocalReviews = getLocalReviews;



module.exports = reviewModel;


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

    function addReview(userObj)
    {
        var prom = q.defer();

        userModel
            .findUserById(userObj.userId)
            .then(function(user)
            {
                var review = {
                    _user: userObj.userId,
                    movieId: userObj.movieId,
                    content: userObj.review,
                    author: user.username
                };

                console.log("hello");


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

//     function deleteWidget(pageId, widgetId)
//     {
//         return pageModel
//             .findById({_id: pageId})
//             .then(function(page){
//
//                 var index = page.widgets.indexOf(widgetId);
//                 page.widgets.splice(index, 1);
//
//                 return page.save();
//
//             }, function(err){
//                 console.log(err);
//             });
//     }
//
//     function addWidget(pageId, widgetId)
//     {
//        return pageModel
//            .findById(pageId)
//            .then(function(page){
//                 page.widgets.push(widgetId);
//                 return page.save();
//            },
//            function(){
//
//            })
//     }
//
//
//
//
// /*
// function deletePageFromWebsite(websiteId, pageId) {
//
//    return widgetModel.findAllWidgetsForPage(pageId)
//         .then(function(widgets){
//             widgets.forEach(function(w){
//                 widgetModel.deleteWidget(w._id)
//                     .then(function(){},
//                     function(){})
//             });
//             return pageModel
//                 .remove({_id: pageId})
//                 .then(function (status) {
//                     return websiteModel
//                         .deletePages(websiteId, pageId)
//                         .then(function(){
//
//                         }, function(err){console.log(err);});
//                 });
//
//         })
// }*/
//
//     function updatePage(pageId, newPage) {
//         delete newPage._website;
//         delete newPage.dateCreated;
//
//         return pageModel
//             .update({_id: pageId},{$set: newPage});
//     }
//
//     function deletePage(pageId)
//     {
//         return pageModel
//             .remove({_id: pageId});
//     }
//
//     function findPageById(pageId)
//     {
//         return pageModel
//             .findById({_id: pageId});
//     }
//
//     function findAllPagesForWebsite(websiteId) {
//         return pageModel
//             .find({_website: websiteId})
//             .populate('_website')
//             .exec();
//     }
//
//
//
//     function findAllPages() {
//         return pageModel.find();
//     }