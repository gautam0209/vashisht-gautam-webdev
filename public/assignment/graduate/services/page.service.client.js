/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
        angular
            .module('WebAppMaker')
            .factory('pageService', pageService);

        function pageService($http)
        {


            var api = {
                findPagesByWebsiteId: findPagesByWebsiteId,
                createPage:createPage,
                findPageById: findPageById,
                updatePage:updatePage,
                deletePage: deletePage

            };

            return api;

            function findPagesByWebsiteId(websiteId)
            {
                var url ="/api/website/" + websiteId + "/page";
                return $http.get(url)
                    .then(function(response){
                        return response.data
                    });
            }

            function createPage(name, description, websiteId)
            {
                var newPage = { "_id": new Date().getTime().toString(), "name": name,    "websiteId": websiteId, "description": description };

                var url = "/api/website/" + websiteId + "/page";

                return $http.post(url, newPage)
                    .then(function(response){
                        return response.data
                    });

            }

            function updatePage(pageId, page)
            {

                var url = "/api/page/" + pageId;

                return $http.put(url, page)
                    .then(function(response){
                        return response.data
                    });


            }

            function findPageById(pageId)
            {

                var url = "/api/page/" + pageId;

                return $http.get(url)
                    .then(function(response){
                        return response.data
                    });

            }

            function deletePage(pageId){

                var url = "/api/page/" + pageId;

                return $http.delete(url)
                    .then(function(){
                    },
                    function(){
                    });
            }
        }
})();
