/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppProj')
        .controller('profileController',profileController);

    function profileController(userService,
                               //$routeParams,
                               currentUser,
                               $location){

        var model = this;

       // model.userId = $routeParams['userId'];

        //model.user = userService.findUserById(model.userId);

        // var promise = userService.findUserById(model.userId);

       // promise.then(renderUser);

        model.userId = currentUser._id;


        model.updateProfile = updateProfile;
        model.deleteProfile = deleteProfile;
        model.unregister = unregister;
        model.currentUser = currentUser;
        model.logout = logout;
        model.goBack = goBack;

        function init()
        {
            renderUser(currentUser);
        }
        init();

        function goBack()
        {
            $location.url(userService.getProfileTrace());
        }

        function logout()
        {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateProfile(user){
            userService.updateProfile(model.userId, user)
                .then(function(){
                    model.message = "User update was successful.";
                },
                function(){
                    model.error = "User update failed.";
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

        function unregister(){
            userService
                .unregister()
                .then(function(){
                        $location.url('/');
                    },
                    function(){
                        model.message = "User delete failed.";
                    });

        }

        // userService.findUserById(model.userId)
        //     .then(renderUser, userError);

        function userError(error){
            model.error = "User Not Found.";
        }

        function renderUser(user){
            model.user = user;
        }

    }
})();