/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .controller('profileController',profileController);

    function profileController(userService, $routeParams){

        var model = this;

        model.userId = $routeParams['userId'];

        model.user = userService.findUserById(model.userId);

    }
})();