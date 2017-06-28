(function (){
    angular
        .module('WebAppProj')
        .controller('adminUsersController',adminUsersController);

    function adminUsersController(userService,
                                  currentUser) {

        var model = this;
        model.findAllUsers = findAllUsers;
        model.currentUser = currentUser;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        model.selected = false;
        model.movies = [];
        model.users = [];
        model.roles=["ADMIN","EXPERT","USER"];

        function init() {
            findAllUsers();
        }

        init();




        function updateUser(user)
        {
            userService
                .updateUser(user._id,user)
                .then(findAllUsers);
            model.selected = false;
            model.user = null;
        }

        function selectUser(user)
        {
            model.error ="";
            model.user = angular.copy(user);
            model.selected = true;
        }

        function createUser(user)
        {
            if(!user)
                model.error = "Please provide user details";
            else if(!user.username)
                model.error = "Please provide username";
            else if(!user.firstName)
                model.error = "Please provide firstname";
            else {
                user.password = 'default';
                userService
                    .createUser(user)
                    .then(findAllUsers);
                model.user = null;
            }
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
            model.error ="";
            userService
                .deleteUser(user._id)
                .then(findAllUsers);
        }
    }
})();