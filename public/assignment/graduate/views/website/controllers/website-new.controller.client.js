/**
 * Created by Gautam Vashisht on 5/26/2017.
 */

(function(){
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                   websiteService,
                                   $location){
        var model = this;

        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;



        function init(){
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }

        init();

        function createWebsite(name, description){
            if(name === null || name === '' || typeof name === 'undefined')
                model.error = "Please provide website name.";
            else {
                websiteService.createWebsite(name, description, model.userId);
                $location.url('/user/' + model.userId + '/website');
            }
        }


    }
})();