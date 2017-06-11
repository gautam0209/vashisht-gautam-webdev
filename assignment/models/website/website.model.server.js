var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('websiteModel', websiteSchema);
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
    console.log(website);
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                        .addWebsite(userId, website._id)
        },function(err){
            console.log(err);
        })
}

function findAllWebsites() {
    return websiteModel.find();
}