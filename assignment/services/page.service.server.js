var app = require('../../express');

var pageModel = require('../models/page/page.model.server');


var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "789", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "789", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "789", "description": "Lorem" }
];

app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.post('/api/website/:websiteId/page', createPage);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);



function deletePage(req, res) {
    var pageId = req.params['pageId'];
    var websiteId = req.params['websiteId'];
    //
    // for (var p in pages) {
    //     if (pages[p]._id == pageId) {
    //         pages.splice(p, 1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    pageModel
        .deletePageFromWebsite(websiteId, pageId)
        .then(function(){
            res.sendStatus(200);
        },
        function(){
            res.sendStatus(404);
        });
}

function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var page = req.body;

    // for(var p in pages)
    // {
    //     // var web = websites[w];
    //     if(pages[p]._id == pageId)
    //     {
    //         pages[p].name = page.name;
    //         pages[p].description = page.description;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }

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
    // var page = pages.find(function (pg) {
    //     return pg._id === pageId;
    // });
    //     res.json(page);

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

        // for(var p in pages){
        //     if(pages[p].websiteId === websiteId){
        //         pages[p].created = (new Date()).getDate() + "/" + (new Date()).getMonth() + "/2017";
        //         pages[p].accessed = (new Date()).getDate() + "/" + (new Date()).getMonth() + "/2017";
        //         results.push(pages[p]);
        //     }
        // }
        // res.json(results);

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
    // pages.push(page);
    // res.sendStatus(200);
    pageModel.createPage(websiteId, page)
        .then(function(page){
            res.json(page);
        }, function(){
            console.log('hello123');
            res.sendStatus(404);
        });
}