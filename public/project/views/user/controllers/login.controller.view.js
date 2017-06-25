(function (){
    angular
        .module('WebAppProj')
        .controller('loginController',loginController);

    function loginController(userService,
                             $location){

        var model = this;

        model.login = login;

        function init()
        {

        }
        init();

        function login(username, password)
        {
            if(!username && !password)
            {
                model.error = "Username and Password is required.";
            }
            else if(!username)
            {
                model.error = "UserName is required.";
            }
            else if(!password)
                model.error = "Password is required.";
            else {
                userService.login(username, password)
                    .then(function (found) {
                            if(found.roles.indexOf('ADMIN') === -1)
                                $location.url('/');
                            else
                                $location.url('/admin');
                            model.message = "Welcome, " + username;
                        },
                        function () {
                            model.error = "Sorry, username: " + username + " with entered password doesnt exist";
                        }
                    )
            }

        };
    }
})();