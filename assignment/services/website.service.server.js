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

    websiteModel
        .findWebsiteById(websiteId)
        .then(function(website){
            var userId = website._user;
            websiteModel.deleteWebsiteFromUser(userId, websiteId)
                .then(function(){
                        res.sendStatus(200);
                    },
                    function(){
                        res.sendStatus(404);
                    });
        })
}

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var website = req.body;

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

    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function(website){
                res.json(website);
        },function(){
            res.sendStatus(404);
        });

}