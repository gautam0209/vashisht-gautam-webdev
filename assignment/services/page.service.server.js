var app = require('../../express');


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

    for (var p in pages) {
        if (pages[p]._id == pageId) {
            pages.splice(p, 1);
            res.sendStatus(200);
            return;
        }
    }
}

function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var page = req.body;

    for(var p in pages)
    {
        // var web = websites[w];
        if(pages[p]._id == pageId)
        {
            pages[p].name = page.name;
            pages[p].description = page.description;
            res.sendStatus(200);
            return;
        }
    }



}

function findPageById(req, res)
{
    var pageId = req.params['pageId'];
    var page = pages.find(function (pg) {
        return pg._id === pageId;
    });
        res.json(page);
}



function findAllPagesForWebsite(req, res){
        var results = [];

        var websiteId = req.params['websiteId'];

        for(var p in pages){
            if(pages[p].websiteId === websiteId){
                pages[p].created = (new Date()).getDate() + "/" + (new Date()).getMonth() + "/2017";
                pages[p].accessed = (new Date()).getDate() + "/" + (new Date()).getMonth() + "/2017";
                results.push(pages[p]);
            }
        }
        res.json(results);
        return;
    }

function createPage(req, res){

    var page = req.body;
    pages.push(page);
    res.sendStatus(200);
}