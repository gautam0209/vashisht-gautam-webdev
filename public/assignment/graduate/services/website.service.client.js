/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .factory('websiteService',websiteService);

    function websiteService($http) {

        var api =
            {
                findWebsitesByUser: findWebsitesByUser,
                findWebsiteById: findWebsiteById,
                deleteWebsite: deleteWebsite,
                createWebsite: createWebsite,
                updateWebsite: updateWebsite
            };

        return api;


        function findWebsiteById(websiteId) {

            var url = "/api/website/" + websiteId;
            return $http.get(url)
                .then(function(response){
                    return response.data
                });

        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url)
                .then(function(response){
                    return response.data
                });
        }

        function createWebsite(name, description, userId) {
            var newWebsite = {
                "name": name,
                "developerId": userId,
                "description": description
            };

            var url = "/api/assignment/graduate/user/" + userId + "/website";
            return $http.post(url,newWebsite)
                .then(function(response)
                {
                    return response.data;
                });
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website)
                .then(function(response){
                    return response.data
                });

        }

        function findWebsitesByUser(userId) {
            var url = "/api/assignment/graduate/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data
                })


        }
    }
})();