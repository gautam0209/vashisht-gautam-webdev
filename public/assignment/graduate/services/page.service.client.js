/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
        angular
            .module('WebAppMaker')
            .factory('pageService', pageService);

        function pageService()
        {

            var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "789", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "789", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "789", "description": "Lorem" }
            ];


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
                var results = [];
                for(var p in pages)
                {
                    var page = pages[p];
                    if(page.websiteId === websiteId)
                        results.push(page);
                }

                return results;
            }

            function createPage(name, description, websiteId)
            {
                var newPage = { "_id": new Date().getTime().toString(), "name": name,    "websiteId": websiteId, "description": description };
                pages.push(newPage);
                return newPage;
            }

            function updatePage(pageId, page)
            {
                for(var p in pages)
                {
                    // var web = websites[w];
                    if(pages[p]._id == pageId)
                    {
                        pages[p].name = page.name;
                        pages[p].description = page.description;
                    }
                }

            }

            function findPageById(pageId)
            {
                for(var p in pages)
                {
                    var page = pages[p];
                    if(page._id === pageId)
                        return page;
                }

                return null;
            }

            function deletePage(pageId){
                var page = findPageById(pageId);
                var index = pages.indexOf(page);
                pages.splice(index, 1);
            }
        }
})();
