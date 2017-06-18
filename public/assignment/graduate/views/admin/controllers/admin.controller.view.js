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
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;

        function init() {
            findAllUsers();
        }

        init();

        function updateUser(user)
        {
            userService
                .updateUser(user._id,user)
                .then(findAllUsers);
        }

        function selectUser(user)
        {
            model.user = angular.copy(user);
        }

        function createUser(user)
        {
            userService
                .createUser(user)
                .then(findAllUsers);
        }

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