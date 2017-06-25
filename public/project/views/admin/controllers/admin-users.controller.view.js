(function (){
    angular
        .module('WebAppProj')
        .controller('adminUsersController',adminUsersController);

    function adminUsersController(userService,
                             movieService,
                             currentUser,
                             $location) {

        var model = this;
        model.findAllUsers = findAllUsers;
        model.currentUser = currentUser;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        model.getUserById = getUserById;
        model.getMovieById = getMovieById;
        model.selected = false;
        model.movies = [];
        model.users = [];

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
            model.user = angular.copy(user);
            model.selected = true;
        }

        function createUser(user)
        {
            user.password = 'default';
            userService
                .createUser(user)
                .then(findAllUsers);
            model.user =null;
        }

        function findAllUsers()
        {
            userService.findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }


        function getMovieById(movieId)
        {
            movieService.findMovieById(movieId)
                .then(function(movie)
                    {
                        model.movie = movie.title;
                        console.log(model.movie);
                        return model.movie;
                    }
                )
        }

        function getUserById(userId)
        {
            userService
                .findUserById(userId)
                .then(function(user)
                    {
                        model.userName = user.username;
                        console.log(model.userName);
                        //return model.userName;
                    }
                )
        }

        function deleteUser(user)
        {
            userService
                .deleteUser(user._id)
                .then(findAllUsers);
        }
    }
})();