/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .controller('loginController',loginController);

    function loginController(userService, $location){

        var model = this;

        model.login = login;

        function init()
        {

        }
        init();

        function login(username, password)
        {
            userService.login(username, password)
                .then(function (found){
                        $location.url('/profile');
                        model.message = "Welcome, " + username;
                    },
                    function()
                    {
                        model.message = "Sorry, username: " + username + " with entered password doesnt exist";
                    }
                )

        };
    }
})();