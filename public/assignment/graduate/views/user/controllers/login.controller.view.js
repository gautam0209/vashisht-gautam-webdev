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

        function login(username, password)
        {
            var found = userService.findUserByCredential(username, password);
            if(found != null)
            {
                $location.url('/user/' + found._id);
                model.message = "Welcome, " + username;
            }
            else
            {
                model.message = "Sorry, username: " + username + " with entered password doesnt exist";
            }
        }
    }
})();