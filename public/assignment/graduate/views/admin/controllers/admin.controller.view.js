/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .controller('adminController',adminController);

    function adminController(userService, $location) {

        var model = this;
        model.findAllUsers = findAllUsers;
        model.deleteUser = deleteUser;

        function init() {
            findAllUsers();
        }

        init();

        function findAllUsers()
        {
            userService.findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }

        function deleteUser(user)
        {
            userService
                .deleteUser(user._id)
                .then(findAllUsers);
        }
    }
})();