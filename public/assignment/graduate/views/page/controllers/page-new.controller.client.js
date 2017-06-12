/**
 * Created by Gautam Vashisht on 5/26/2017.
 */

(function(){
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                   pageService,
                                   $location){
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        model.createPage = createPage;

        function init()
        {
            pageService.findPagesByWebsiteId(model.websiteId)
                .then(function(pages){
                    model.pages = pages
                });
        }

        init();

        function createPage(page){
            // if(name === null || name === '' || typeof name === 'undefined')
            if(page.name === '' )
                model.error = "Please provide page name.";
            else {
                //var newPage = pageService.createPage(page.name, page.title, model.websiteId);
                pageService.createPage(page.name, page.title, model.websiteId)
                    .then(function(page){
                        var newPage = page;
                    });
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
            }
        }


    }
})();