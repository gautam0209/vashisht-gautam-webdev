var app = require('../../express');

var websiteModel = require('../models/website/website.model.server');



// var websites = [
//     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
//     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
//     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
//     { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
//     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
//     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
//     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
// ];

app.get('/api/assignment/graduate/user/:userId/website', findAllWebsitesForUser);
app.post('/api/assignment/graduate/user/:userId/website', createWebsite);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);




function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var userId = req.params['userId'];

    // for (var w in websites) {
    //     if (websites[w]._id === websiteId) {
    //         websites.splice(w, 1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    websiteModel.deleteWebsiteFromUser(userId, websiteId)
        .then(function(){
            res.sendStatus(200);
            },
        function(){
            console.log("hello");
            res.sendStatus(404);
        });
}

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var website = req.body;

        // for (var w in websites) {
        //     if (websites[w]._id == websiteId) {
        //         websites[w].name = website.name;
        //         websites[w].description = website.description;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }

        websiteModel.updateWebsite(websiteId, website)
            .then(function(){
                res.sendStatus(200);
            },
            function(){
                res.sendStatus(404);
            });

    }

function findWebsiteById(req, res)
{
    var websiteId = req.params['websiteId'];
    // var web = websites.find(function (website) {
    //     return website._id === websiteId;
    // });
    //     res.json(web);
    websiteModel
        .findWebsiteById(websiteId)
        .then(function(website){
            if(website)
                res.json(website);
            else
                res.sendStatus(404);
        },function(){
            res.sendStatus(404);
        });
}



function findAllWebsitesForUser(req, res){
        var results = [];

        var userId = req.params['userId'];

        // for(var v in websites){
        //     if(websites[v].developerId === userId){
        //         websites[v].created = (new Date()).getDate() + "/" + (new Date()).getMonth() + "/2017";
        //         websites[v].accessed = (new Date()).getDate() + "/" + (new Date()).getMonth() + "/2017";
        //         results.push(websites[v]);
        //     }
        // }
        //
        // res.json(results);


    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function(websites){
            if(websites)
                res.send(websites);
            else
                res.sendStatus(404);
        },function(){
            res.sendStatus(404);
        });
    }

function createWebsite(req, res){

    var website = req.body;
    var userId = req.params['userId'];
    // websites.push(website);
    // res.sendStatus(200);
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function(website){
            if(website)
                res.json(website);
            else
                res.sendStatus(404);
        },function(){
            res.sendStatus(404);
        });

}