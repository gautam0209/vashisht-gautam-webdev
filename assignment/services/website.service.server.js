var app = require('../../express');


var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get('/api/assignment/graduate/user/:userId/website', findAllWebsitesForUser);
app.post('/api/assignment/graduate/user/:userId/website', createWebsite);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);




function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];

    for (var w in websites) {
        if (websites[w]._id === websiteId) {
            websites.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
}

function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var website = req.body;

    for (var w in websites) {
        if (websites[w]._id == websiteId) {
            websites[w].name = website.name;
            websites[w].description = website.description;
            res.sendStatus(200);
            return;
        }
    }


}

function findWebsiteById(req, res)
{
    var websiteId = req.params['websiteId'];
    var web = websites.find(function (website) {
        return website._id === websiteId;
    });
        res.json(web);
}



function findAllWebsitesForUser(req, res){
        var results = [];

        var userId = req.params['userId'];

        for(var v in websites){
            if(websites[v].developerId === userId){
                websites[v].created = (new Date()).getDate() + "/" + (new Date()).getMonth() + "/2017";
                websites[v].accessed = (new Date()).getDate() + "/" + (new Date()).getMonth() + "/2017";
                results.push(websites[v]);
            }
        }

        res.json(results);
        return;
    }

function createWebsite(req, res){

    var website = req.body;
    websites.push(website);
    res.sendStatus(200);
}