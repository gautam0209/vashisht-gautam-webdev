/**
 * Created by Gautam Vashisht on 5/26/2017.
 */

(function(){
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                   websiteService,
                                   currentUser,
                                   $location){
        var model = this;

        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.createWebsite = createWebsite;



        function init(){
             websiteService.findWebsitesByUser(model.userId)
                 .then(function(websites){
                     model.websites = websites;
                 });
        }

        init();

        function createWebsite(website){
            // if(website.name === null || website.name === '' || typeof website.name === 'undefined')
            if(website.name === '')
                model.error = "Please provide website name.";
            else {
                websiteService
                    .createWebsite(website.name, website.description, model.userId)
                    .then(function()
                    {
                        model.message = "Website Created Successfully";
                    },
                    function(){
                        model.message = "Website Creation Failed.";
                    });

                $location.url('/website');
            }
        }


    }
})();