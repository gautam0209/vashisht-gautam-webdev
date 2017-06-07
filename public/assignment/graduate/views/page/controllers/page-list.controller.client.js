/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
   angular
       .module('WebAppMaker')
       .controller('pageListController', pageListController);

   function pageListController(pageService, $routeParams)
   {
        var model = this;

        model.websiteId = $routeParams['websiteId'];
        model.userId = $routeParams['userId'];

        function init()
        {
            pageService.findPagesByWebsiteId(model.websiteId)
                .then(function(pages){
                    model.pages = pages
                });

        }

        init();

   }


})();
