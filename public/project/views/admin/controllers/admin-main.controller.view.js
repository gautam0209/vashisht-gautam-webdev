(function (){
    angular
        .module('WebAppProj')
        .controller('adminMainController',adminMainController);

    function adminMainController(userService,
                             $location,
                             currentUser) {

        var model = this;
        model.currentUser = currentUser;
        model.logout =logout;

        function init() {

            userService
                .findRequests()
                .then(function(requests){
                    model.requests = requests.data;
                })
        }

        init();

       function logout()
       {
           userService.logout();
           $location.url('/');
       }
    }
})();