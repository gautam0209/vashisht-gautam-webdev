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



        function createPage(name, title){
            if(name === null || name === '' || typeof name === 'undefined')
                model.error = "Please provide page name.";
            else {
                var newPage = pageService.createPage(name, title, model.websiteId);
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
            }
        }


    }
})();