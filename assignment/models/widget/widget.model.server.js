var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('widgetModel', widgetSchema);
// var pageModel = require('../page/page.model.server');
// var websiteModel = require('../website/website.model.server');

var userModel = require('../user/user.model.server');
var websiteModel = require('../website/website.model.server');
var pageModel = require('../page/page.model.server');

//var widgetModel = require('../widget/widget.model.server');


// api
widgetModel.findAllWidgets = findAllWidgets;
widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.deleteWidgetFromPage = deleteWidgetFromPage;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.reorderWidget = reorderWidget;
// websiteModel.addPages = addPages;
// websiteModel.deletePages = deletePages;

module.exports = widgetModel;

// function deletePages(websiteId, pageId)
// {
//     return websiteModel
//         .findById(websiteId)
//         .then(function(website){
//             var index = website.pages.indexOf(pageId);
//             website.pages.splice(index, 1);
//             return website.save();
//         });
// }
//


function reorderWidget(pageId,start, end)
{

    return pageModel
        .findPageById(pageId)
        .then(function(page){
                var widgets = page.widgets;
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
                            widgets[end] = tempE;
                            break;
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
                            break;
                        }
                    }
                }


                page.widgets = widgets;

                //return page.save();
                pageModel.updatePage(pageId, page)
                    .then(function(page){

                    }, function(){

                    });


            }, function(){

                res.sendStatus(404);
            }
        );
}

function deleteWidgetFromPage(pageId, widgetId) {

    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

function updateWidget(widgetId, newWidget) {
    delete newWidget._page;
    delete newWidget.dateCreated;
    return widgetModel
        .update({_id: widgetId},{$set: newWidget});
}

function deleteWidget(widgetId)
{
    return widgetModel
        .remove({_id: widgetId});
}

function findWidgetById(widgetId)
{
    return widgetModel
        .findById({_id: widgetId});
}

function findAllWidgetsForPage(pageId) {

    return widgetModel
        .find({_page: pageId})
        .populate('_page')
        .exec();
}
//
//     function addPages(websiteId, pageId)
//     {
//         return websiteModel
//             .findById(websiteId)
//             .then(function (website) {
//                 website.pages.push(pageId);
//                 return website.save();
//             });
//     }
//
function createWidget(pageId, widget) {

    widget._page = pageId;

    return widgetModel
        .create(widget)
        .then(function (widget) {
            return pageModel
                .addWidget(pageId, widget._id)
            //.addWidget(pageId, widget._id)
        },function(err){
            console.log(err);
        })
}

function findAllWidgets() {
    return widgetModel.find();
}