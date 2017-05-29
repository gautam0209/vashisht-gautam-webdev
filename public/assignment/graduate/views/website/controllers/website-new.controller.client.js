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
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }

        init();

        function createWebsite(website){
            // if(website.name === null || website.name === '' || typeof website.name === 'undefined')
            if(website.name === '')
                model.error = "Please provide website name.";
            else {
                websiteService.createWebsite(website.name, website.description, model.userId);
                $location.url('/user/' + model.userId + '/website');
            }
        }


    }
})();