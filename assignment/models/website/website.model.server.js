var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('websiteModel', websiteSchema);

var q = require('q');

 var userModel = require('../user/user.model.server');

// api
websiteModel.findAllWebsites = findAllWebsites;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.deleteWebsiteFromUser = deleteWebsiteFromUser;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.addPages = addPages;
websiteModel.deletePages = deletePages;

module.exports = websiteModel;

function deletePages(websiteId, pageId)
{
    return websiteModel
        .findById(websiteId)
        .then(function(website){
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

function deleteWebsiteFromUser(userId, websiteId) {


    // return pageModel.findAllPagesForWebsite(websiteId)
    //     .then(function(pages)
    //     {
    //          pages.forEach(function(p){
    //             pageModel.deletePage(p._id)
    //                 .then(function(){
    //
    //                 })
    //         });
    //
    //          userModel.deleteWebsite(userId,websiteId)
    //              .then(function(){});

            return websiteModel
                .remove({_id: websiteId})
                .then(function (status) {
                    return userModel
                        .deleteWebsite(userId, websiteId);
                });
}

function updateWebsite(websiteId, newWebsite) {
    delete newWebsite._user;
    delete newWebsite.dateCreated;
    return websiteModel
        .update({_id: websiteId},{$set: newWebsite});
}

function deleteWebsite(websiteId)
{
    return websiteModel
        .remove({_id: websiteId});
}

function findWebsiteById(websiteId)
{
    return websiteModel
        .findById({_id: websiteId});
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

    function addPages(websiteId, pageId)
    {
        return websiteModel
            .findById(websiteId)
            .then(function (website) {
                website.pages.push(pageId);
                return website.save();
            });
    }

function createWebsiteForUser(userId, website) {
    website._user = userId;
    var prom = q.defer();
      websiteModel
        .create(website)
        .then(function (website) {
               userModel
                        .addWebsite(userId, website._id)
                   .then(function(){
                       prom.resolve(website);
                   })
        },function(err){
            console.log(err);
        })
    return prom.promise;
}

function findAllWebsites() {
    return websiteModel.find();
}