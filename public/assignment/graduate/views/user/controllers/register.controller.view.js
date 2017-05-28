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

        function register(username, password, password2)
        {
            if(username === null || username === '' || typeof username === 'undefined')
            {
                model.error = 'username is required';
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined'){
                model.error = "passwords must match";
                return;
            }

            var found = userService.findUserByUserName(username);
            if(found != null)
            {
                model.error = "Sorry, username: " + username + " already exist!!";
            }
            else
            {
                var user = {
                    username: username,
                    password: password,
                    firstName: "New",
                    lastName: "Entry"
                };
                var newUser = userService.createUser(user);
                $location.url('/user/' + newUser._id);
            }
        }
    }
})();