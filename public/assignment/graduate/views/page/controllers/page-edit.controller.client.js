/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
   angular
       .module('WebAppMaker')
       .controller('pageEditController', pageEditController);

   function pageEditController(pageService,
                               $routeParams,
                                currentUser,
                                $location)
   {
        var model = this;

        model.websiteId = $routeParams['websiteId'];
        //model.userId = $routeParams['userId'];
        model.userId =  currentUser._id;
        model.pageId = $routeParams['pageId'];

        model.deletePage = deletePage;
        model.updatePage = updatePage;


        function init()
        {
            pageService.findPagesByWebsiteId(model.websiteId)
                .then(function(pages){
                    model.pages = pages
                });
            // model.page = pageService.findPageById(model.pageId);
            pageService.findPageById(model.pageId)
                .then(function(page){
                    model.page = page
                        });
        }

        init();

       function updatePage(page)
       {
           if(!page || !page.name)
               model.error = "Page Name is required field."
           else
           {
               pageService.updatePage(model.pageId, page)
                   .then(function () {
                   });
               $location.url('/website/' + model.websiteId + '/page');
           }
       }

        function deletePage(pageId)
        {
            pageService.deletePage(pageId)
                .then(function(){});
            $location.url('/website/' + model.websiteId + '/page');

        }

   }


})();
