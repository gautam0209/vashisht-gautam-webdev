/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .factory('websiteService',websiteService);

    function websiteService()
    {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api =
            {
                findWebsitesByUser: findWebsitesByUser,
                findWebsiteById:findWebsiteById,
                deleteWebsite:deleteWebsite,
                createWebsite:createWebsite,
                updateWebsite:updateWebsite
            };

        return api;

        function findWebsiteById(websiteId){
            var web = websites.find(function (website){
                return website._id === websiteId;
            });

            return angular.copy(web);
        }

        function deleteWebsite(websiteId){
            var website = findWebsiteById(websiteId);
            var index = websites.indexOf(website);
            websites.splice(index, 1);
        }

        function createWebsite(name, description, userId)
        {
            var newWebsite = { "_id": new Date().getTime().toString(), "name": name,    "developerId": userId, "description": description };
            websites.push(newWebsite);
            return newWebsite;
        }

        function updateWebsite(websiteId, website)
        {
            for(var w in websites)
            {
                // var web = websites[w];
                if(websites[w]._id == websiteId)
                {
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                }
            }

        }

        function findWebsitesByUser(userId)
        {
            var results = [];

            for(var v in websites){
                if(websites[v].developerId === userId){
                    websites[v].created = (new Date()).getDate() + "/" + (new Date()).getMonth() + "/2017";
                    websites[v].accessed = (new Date()).getDate() + "/" + (new Date()).getMonth() + "/2017";
                    results.push(websites[v]);
                }
            }

            return results;
        }


    }

})();