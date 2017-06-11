var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('pageModel', pageSchema);

var userModel = require('../user/user.model.server');
var websiteModel = require('../website/website.model.server');

// api
    pageModel.findAllPages = findAllPages;
    pageModel.createPage = createPage;
    pageModel.findPageById = findPageById;
    pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
    pageModel.deletePageFromWebsite = deletePageFromWebsite;
    pageModel.deletePage = deletePage;
    pageModel.updatePage = updatePage;
    pageModel.addWidget = addWidget;
    pageModel.deleteWidget = deleteWidget;


module.exports = pageModel;

    function deleteWidget(pageId, widgetId)
    {
        return pageModel
            .findById(pageId)
            .then(function(page){
                var index = page.widgets.indexOf(widgetId);
                page.widgets.splice(index, 1);
                return page.save();
            });
    }

    function addWidget(pageId, widgetId)
    {
       return pageModel
           .findPageById(pageId)
           .then(function(page){
                page.widgets.push(widgetId);
                return page.save();
           },
           function(){

           })
    }

    function deletePageFromWebsite(websiteId, pageId) {
        return pageModel
            .remove({_id: pageId})
            .then(function (status) {
                return websiteModel
                            .deletePages(websiteId, pageId);
            });
    }

    function updatePage(pageId, newPage) {
        delete newPage._website;
        delete newPage.dateCreated;
        return pageModel
            .update({_id: pageId},{$set: newPage});
    }

    function deletePage(pageId)
    {
        return pageModel
            .remove({_id: pageId});
    }

    function findPageById(pageId)
    {
        return pageModel
            .findById({_id: pageId});
    }

    function findAllPagesForWebsite(websiteId) {
        return pageModel
            .find({_website: websiteId})
            .populate('_website')
            .exec();
    }

    function createPage(websiteId, page) {
        page._website = websiteId;
        return pageModel
            .create(page)
            .then(function (page) {
                return websiteModel
                            .addPages(websiteId, page._id)
            },function(err){
                console.log(err);
            })
    }

    function findAllPages() {
        return pageModel.find();
    }