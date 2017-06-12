const app = require('../../express');

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/assignment/graduate/uploads'});

var widgetModel = require('../models/widget/widget.model.server');



// var widgets = [
//     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/400/200/"},
//     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem cvnbm ipsum</p>"},
//     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E" },
//     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];

app.post("/api/upload", upload.single('myFile'), uploadImage);
app.get("/api/widget/:widgetId",findWidgetById);
app.delete("/api/widget/:widgetId",deleteWidget);
app.put("/api/widget/:widgetId",updateWidget);


app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
app.post("/api/page/:pageId/widget",createWidget);
app.put('/page/:pageId/widget', sortWidget);


function sortWidget(req, res)
{
    var pageId = req.params['pageId'];
    var start = req.query['initial'];
    var end = req.query['final'];

    widgetModel.reorderWidget(pageId,start,end)
        .then(function(){
            res.sendStatus(200);
        },function(){
            res.sendStatus(404);
        });
}


function deleteWidget(req, res)
{
    var widgetId = req.params['widgetId'];

    widgetModel.findWidgetById(widgetId)
        .then(function(widget){
            var pageId = widget._page;
            widgetModel
                .deleteWidgetFromPage(pageId, widgetId)
                .then(function(){
                    res.sendStatus(200);
                },function(){
                    res.sendStatus(404);
                });
        },function(){});


}

function createWidget(req, res)
{
    var widget = req.body;
    var pageId = req.params['pageId'];

    widgetModel
        .createWidget(pageId,widget)
        .then(function(widget){
            res.json(widget);
        }, function(){
            res.sendStatus(404);
        });
}

function updateWidget(req, res)
{
    var widgetId = req.params['widgetId'];
    var widget = req.body;

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function(widget){
            res.sendStatus(200);
        },function(){
            res.sendStatus(404);
        });
}


function findAllWidgetsForPage(req, res)
{
    var pageId = req.params['pageId'];

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function(widgets){
            if(widgets)
                res.json(widgets);
            else
                res.sendStatus(404);
        }, function(){
            res.sendStatus(404);
        });
}

function findWidgetById(req, res)
{
    var widgetId = req.params['widgetId'];

    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget){
            if(widget)
                res.json(widget);
            else
                res.sendStatus(404);
        }, function(){
            res.sendStatus(404);
        });
}

function findWidgetForUploadById(widgetId)
{

    return widgetModel
        .findWidgetById(widgetId);
}

function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;
    var widget ={};

    if(myFile) {

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

       // widget = findWidgetForUploadById(widgetId);
        if(widgetId)
        findWidgetForUploadById(widgetId)
            .then(function(widget){

                widget.url = '/assignment/graduate/uploads/' + filename;

                widgetModel.updateWidget(widgetId, widget)
                    .then(function() {
                        var callbackUrl = "/assignment/graduate/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
                        res.redirect(callbackUrl);
                    })
            });
        else {
            widget.url = '/assignment/graduate/uploads/' + filename;
            widget.widgetType= 'IMAGE';

            widgetModel.createWidget(pageId, widget)
                .then(function (widget) {
                    var callbackUrl = "/assignment/graduate/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
                    res.redirect(callbackUrl);
                })
        }
    }
}

