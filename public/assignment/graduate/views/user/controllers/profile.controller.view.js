/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .controller('profileController',profileController);

    function profileController(userService, $routeParams, $location){

        var model = this;

        model.userId = $routeParams['userId'];

        //model.user = userService.findUserById(model.userId);

        // var promise = userService.findUserById(model.userId);

       // promise.then(renderUser);



        model.updateProfile = updateProfile;
        model.deleteProfile = deleteProfile;

        function updateProfile(user){
            userService.updateUser(model.userId, user)
                .then(function(){
                    model.message = "User update was successful.";
                },
                function(){
                    model.message = "User update failed.";
                });
        }

        function deleteProfile(user){
            userService.deleteUser(model.userId)
                .then(function(){
                        $location.url('/login');
                    },
                    function(){
                        model.message = "User delete failed.";
                    });
        }

        userService.findUserById(model.userId)
            .then(renderUser, userError);

        function userError(error){
            model.error = "User Not Found.";
        }

        function renderUser(user){
            model.user = user;
        }

    }
})();