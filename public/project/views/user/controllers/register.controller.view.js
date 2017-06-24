/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppProj')
        .controller('registerController',registerController);

    function registerController(userService,
                                $location){

        var model = this;

        model.register = register;

        function init()
        {

        }
        init();

        function register(user)
        {
            var username = user.username;
            var password = user.password;
            var password2 = user.password2;
            var email = user.email;
            var firstName = user.firstName;
            var lastName = user.lastName;
            if(username === null || username === '' || typeof username === 'undefined')
            {
                model.error = 'username is required. ';
                return;
            }

            else if(password !== password2 || password === null || typeof password === 'undefined'){
                model.error = "passwords must match";
                return;
            }

            else if(email === null || email === '' || typeof email === 'undefined')
            {
                model.error = 'email is required. ';
                return;
            }

            else if(firstName === null || firstName === '')
            {
                model.error = 'First Name is required.';
            }

            else
                userService.findUserByUserName(username)
                .then(function(){
                        model.error = "Sorry, username: " + username + " already exist!!";
                    },
                    function()
                    {
                        var newUser = {
                            username: username,
                            password: password,
                            email:email,
                            firstName:firstName,
                            lastName:lastName
                        };
                        userService
                            .register(newUser)
                            .then(function (user){
                                $location.url('/');
                            });

                    }

                );
        }
    }
})();