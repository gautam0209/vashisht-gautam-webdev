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


        function init()
        {
            model.page = pageService.findPageFromId(model.pageId);

        }

        init();

        function deletePage(pageId)
        {
            pageService.deletePage(pageId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');

        }

   }


})();
