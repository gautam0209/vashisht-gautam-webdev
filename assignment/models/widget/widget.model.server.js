var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('widgetModel', widgetSchema);


var userModel = require('../user/user.model.server');
var websiteModel = require('../website/website.model.server');
var pageModel = require('../page/page.model.server');


// api
    widgetModel.findAllWidgets = findAllWidgets;
    widgetModel.createWidget = createWidget;
    widgetModel.findWidgetById = findWidgetById;
    widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
    widgetModel.deleteWidgetFromPage = deleteWidgetFromPage;
    widgetModel.deleteWidget = deleteWidget;
    widgetModel.updateWidget = updateWidget;
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
            },function(err){
                console.log(err);
            })
    }

    function findAllWidgets() {
        return widgetModel.find();
    }