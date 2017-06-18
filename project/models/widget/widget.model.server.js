var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('widgetModel', widgetSchema);

var q = require('q');


var pageModel = require('../page/page.model.server');


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
        if(start < end)
        {
            console.log("Inside");
            widgetModel.find({_page:pageId,
                            $and:[{order: {$gt:start}}, {order: {$lte:end}} ]})
                .then(function(widgets){

                        widgets.forEach(function (w) {

                            w.order = w.order - 1;
                            widgetModel.update({_id:w._id},{$set:{order:w.order}})
                                .then(function(){
                                    console.log("success");
                                },function(err){
                                    console.log(err);
                                })
                        })
                }, function(err){
                    console.log("error");
                    console.log(err);
                })

            return widgetModel.findOne({order:start})
                .then(function(widget)
                {
                  widgetModel.update({_id:widget._id}, {$set:{order:end}})
                      .then(function(){
                          console.log("success");
                      })
                });
        }

        else if(end <= start)
        {
            //var wid;
            console.log("Inside");
             return widgetModel.findOne({$and: [{_page:pageId},{order:start}]})
                .then(function(widget){
                  //  wid = widget;
                    widgetModel.find({_page:pageId,
                $and:[{order: {$gte:end}}, {order: {$lt:start}} ]})
                .then(function(widgets){
                    widgets.forEach(function (w) {
                        w.order = w.order + 1;
                        widgetModel.update({_id:w._id},{$set:{order:w.order}})
                            .then(function(){
                            },function(err){
                                console.log(err);
                            })
                    })
                }, function(err){
                    console.log("error");
                    console.log(err);
                })

                     widgetModel.update({_id:widget._id}, {$set:{order:end}})
                        .then(function(){
                            console.log("success");
                        })
                });

        }

        // return pageModel
        //     .findPageById(pageId)
        //     .then(function(page){
        //             var widgets = page.widgets;
        //             var len = widgets.length;
        //
        //
        //             var i = len-1;
        //
        //             if(start > end) {
        //                 while (i >= 0) {
        //
        //                     if (i === len - 1)
        //                         var tempE = widgets[start];
        //
        //                     if (i > end && i <= start) {
        //                         widgets[i] = widgets[parseInt(i) - 1];
        //                     }
        //
        //                     if (i == end) {
        //                         widgets[end] = tempE;
        //                         break;
        //                     }
        //                     i -= 1;
        //                 }
        //
        //             }
        //             else {
        //
        //                 for (var w in widgets) {
        //                     if (w == start) {
        //                         var tempW = widgets[start];
        //                     }
        //
        //                     if (w >= start && w < end) {
        //                         widgets[w] = widgets[parseInt(w) + 1];
        //                     }
        //                     if (w == end) {
        //                         widgets[w] = tempW;
        //                         break;
        //                     }
        //                 }
        //             }
        //
        //
        //             page.widgets = widgets;
        //
        //             pageModel.updatePage(pageId, page)
        //                 .then(function(page){
        //
        //                 }, function(){
        //
        //                 });
        //
        //
        //         }, function(){
        //
        //             res.sendStatus(404);
        //         }
        //     );
    }

function deleteWidgetFromPage(pageId, widgetId) {

        var curOrder;
        widgetModel.findById(widgetId)
            .then(function(widget){
                curOrder = widget.order;
               // console.log("I am here");
                //console.log(widgetModel.find().count());

                    widgetModel.find({_page:pageId, order:{$gt:curOrder}})
                        .then(function(widgets){
                            console.log(widgets.length);
                            if(widgets.length != 0) {
                                widgets.forEach(function (w) {
                                    w.order = w.order - 1;
                                  //  console.log("updating");
                                   // console.log(w.order);
                                    widgetModel.update({_id:w._id},{$set:{order:w.order}})
                                        .then(function(){
                                            console.log("success");
                                        },function(err){
                                            console.log(err);
                                        })
                                })
                            }
                    })

            });

    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

function updateWidget(widgetId, newWidget) {
   // delete newWidget._page;
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
//     var prom = q.defer();
//     var widgets = [];
//     var wids = [];
//     pageModel.findPageById(pageId)
//         .then(function (page) {
//                 widgets = page.widgets;
//                 widgets.forEach(function (w) {
//                     widgetModel.findWidgetById(w)
//                         .then(function (widget) {
//                              console.log(widget);
//                             wids.push(widget);
//                             //console.log(wids);
//                         })
//
//                 })
//                 prom.resolve(wids);
//             }
//
//         )
//
//     return prom.promise;
// }

    //})
    return widgetModel
        .find({_page: pageId})
        .sort({order:1})
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
    var prom = q.defer();
    var curOrder;

    widgetModel
        .findOne({_page:pageId})
        .sort({order:-1})
        .then(function(wid){
            if(wid)
                widget.order = wid.order + 1;
            else
                widget.order =0;
            widgetModel
                .create(widget)
                .then(function (widget) {
                    pageModel
                        .addWidget(pageId, widget._id)
                        .then(function(){
                            prom.resolve(widget);
                        })
                },function(err){
                    console.log(err);
                })
        }, function(err){

        });

    return prom.promise;
}

function findAllWidgets() {
    return widgetModel.find();
}