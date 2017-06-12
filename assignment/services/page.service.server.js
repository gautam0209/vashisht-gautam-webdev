var app = require('../../express');

var pageModel = require('../models/page/page.model.server');


// var pages = [
//     { "_id": "321", "name": "Post 1", "websiteId": "789", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "789", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "789", "description": "Lorem" }
// ];

app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.post('/api/website/:websiteId/page', createPage);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);



function deletePage(req, res) {
    var pageId = req.params['pageId'];
    pageModel.findPageById(pageId)
        .then(function(page)
        {
            var websiteId = page._website;
            pageModel
                .deletePageFromWebsite(websiteId, pageId)
                .then(function(){
                        res.sendStatus(200);
                    },
                    function(){
                        res.sendStatus(404);
                    });
        },
        function(){
            res.sendStatus(404);
        })

}

function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var page = req.body;

    pageModel
        .updatePage(pageId, page)
        .then(function(){
            res.sendStatus(200);
        },
        function(){
            res.sendStatus(404);
        })
}

function findPageById(req, res)
{
    var pageId = req.params['pageId'];

    pageModel
        .findPageById(pageId)
        .then(function(page){
            if(page)
                res.json(page);
            else
                res.sendStatus(404);
        }, function(){
            res.sendStatus(404);
        });
}



function findAllPagesForWebsite(req, res){
        var results = [];

        var websiteId = req.params['websiteId'];

        pageModel.findAllPagesForWebsite(websiteId)
            .then(function(pages){
                if(pages)
                    res.send(pages);
                else
                    res.sendStatus(404);
            }, function(){
                res.sendStatus(404);
            });
    }

function createPage(req, res){

    var page = req.body;
    var websiteId = req.params['websiteId'];

    pageModel.createPage(websiteId, page)
        .then(function(page){
            res.json(page);
        }, function(err){
            console.log(err);
            res.sendStatus(404);
        });
}