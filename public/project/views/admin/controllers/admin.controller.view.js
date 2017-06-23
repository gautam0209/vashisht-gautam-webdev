(function (){
    angular
        .module('WebAppProj')
        .controller('adminController',adminController);

    function adminController(userService,
                             movieService,
                             $location) {

        var model = this;
        model.findAllUsers = findAllUsers;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        model.getUserById = getUserById;
        model.getMovieById = getMovieById;

        function init() {
            findAllUsers();
            findAllReviews();
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
            user.password = 'default';
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

        function findAllReviews()
        {
            movieService.findAllReviews()
                .then(function (reviews) {
                        model.reviews = reviews;
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