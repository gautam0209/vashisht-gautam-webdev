/**
 * Created by Gautam Vashisht on 5/26/2017.
 */

(function(){
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                   currentUser,
                                   websiteService,
                                   $location){
        var model = this;

       // model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];

        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;


        function init(){

            websiteService.findWebsitesByUser(model.userId)
                            .then(function(websites){
                                model.websites = websites;
                });


            websiteService.findWebsiteById(model.websiteId)
                .then(function(website){
                    model.website = website
                }, function(){});

        }

        init();

        function deleteWebsite(websiteId){
            websiteService
                .deleteWebsite(websiteId)
                .then(function(){
                    model.message = "Website Deleted Successfully."
                },
                function(){
                    model.message = "Website Deletion Failed."
                });
            $location.url('/website');
        }

        function updateWebsite(website)
        {
            websiteService
                .updateWebsite(model.websiteId, website)
                .then(function(){
                        model.message = "Website Update Successfully."
                    },
                    function(){
                        model.message = "Website Update Failed."
                    });
            $location.url('/website');
        }


    }
})();