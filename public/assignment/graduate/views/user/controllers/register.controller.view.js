/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .controller('registerController',registerController);

    function registerController(userService, $location){

        var model = this;

        model.register = register;

        function init()
        {

        }
        init();

        function register(username, password, password2)
        {
            if(username === null || username === '' || typeof username === 'undefined')
            {
                model.error = 'username is required. ';
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined'){
                model.error = "passwords must match";
                return;
            }

            userService.findUserByUserName(username)
                .then(function(){
                        model.error = "Sorry, username: " + username + " already exist!!";
                    },
                    function()
                    {
                        var newUser = {
                            username: username,
                            password: password
                        };
                        userService
                            .register(newUser)
                            .then(function (user){
                                $location.url('/profile');
                            });

                    }

                );
        }
    }
})();