/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
   angular
       .module('WebAppMaker')
       .controller('pageEditController', pageEditController);

   function pageEditController(pageService,
                               $routeParams,
                                $location)
   {
        var model = this;

        model.websiteId = $routeParams['websiteId'];
        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['pageId'];

        model.deletePage = deletePage;
        model.updatePage = updatePage;


        function init()
        {
            // model.page = pageService.findPageById(model.pageId);
            pageService.findPageById(model.pageId)
                .then(function(page){
                    model.page = page
                        });
        }

        init();

       function updatePage(page)
       {
           pageService.updatePage(model.pageId, page)
               .then(function(){});
           $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
       }

        function deletePage(pageId)
        {
            pageService.deletePage(pageId)
                .then(function(){});
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');

        }

   }


})();
