const app = require('../../express');

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/assignment/graduate/uploads'});



var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem cvnbm ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

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
    var len = widgets.length;


    var i = len-1;

    if(start > end) {
        while (i >= 0) {

            if (i === len - 1)
                var tempE = widgets[start];

            if (i > end && i <= start) {
                widgets[i] = widgets[parseInt(i) - 1];
            }

            if (i == end) {
                console.log("I m here" + i);
                widgets[end] = tempE;
                res.sendStatus(200);
                return;
            }
            i -= 1;
        }
    }
    else {
        for (var w in widgets) {
            if (w == start) {
                var tempW = widgets[start];
            }

            if (w >= start && w < end) {
                widgets[w] = widgets[parseInt(w) + 1];
            }
            if (w == end) {
                widgets[w] = tempW;
                res.sendStatus(200);
                return;
            }
        }
    }
    res.sendStatus(200);
}


function deleteWidget(req, res)
{
    var widgetId = req.params['widgetId'];
    for(var w in widgets)
    {
        if(widgets[w]._id === widgetId) {
            widgets.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function createWidget(req, res)
{
    var widget = req.body;
    widgets.push(widget);
    res.sendStatus(200);
}

function updateWidget(req, res)
{
    var widgetId = req.params['widgetId'];
    var widget = req.body;

    for(var w in widgets)
    {
        if(widgets[w]._id === widgetId)
        {
            widgets[w].text = widget.text;
            widgets[w].size = widget.size;
            widgets[w].name = widget.name;
            widgets[w].url = widget.url;
            widgets[w].width = widget.width;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findAllWidgetsForPage(req, res)
{
    var pageId = req.params['pageId'];
    var results = [];
    for(var w in widgets)
    {
        var widget = widgets[w];
        if(widget.pageId === pageId)
            results.push(widget);
    }

    res.json(results);
}

function findWidgetById(req, res)
{
    var widgetId = req.params['widgetId'];

    for(var w in widgets)
    {
        var widget = widgets[w];
        if(widget._id === widgetId) {
            res.json(widget);
            return;
        }
    }
    res.sendStatus(404);
}

function findWidgetForUploadById(widgetId)
{
    for(var w in widgets)
    {
        var widget = widgets[w];
        if(widget._id === widgetId)
            return widget;
    }

    return null;
}

function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

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


        widget = findWidgetForUploadById(widgetId);
        widget.url = '/assignment/graduate/uploads/' + filename;

        var callbackUrl = "/assignment/graduate/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

        res.redirect(callbackUrl);
    }
}

