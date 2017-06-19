var app = require('../../express');

var q = require('q');

var reviewModel = require('../models/review/review.model.server');


// var pages = [
//     { "_id": "321", "name": "Post 1", "websiteId": "789", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "789", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "789", "description": "Lorem" }
// ];


 app.post('/api/project/review', addReview);



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