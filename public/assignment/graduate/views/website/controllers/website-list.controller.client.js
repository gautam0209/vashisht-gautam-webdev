/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .controller('websiteListController',websiteListController);



    function websiteListController($routeParams,
                                   currentUser,
                                   websiteService)
    {

        var model = this;

        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;


        function init()
        {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function(websites){
                    model.websites = websites;
                });
        }

        init();

    }
})();