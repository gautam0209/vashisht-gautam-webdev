(function (){
    angular
        .module('WebAppProj')
        .controller('adminController',adminController);

    function adminController(userService,
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
        model.deleteReview = deleteReview;
        model.findRequests = findRequests;
        model.approveRequest = approveRequest;
        model.cancelRequest = cancelRequest;
        model.selected = false;
        model.movies = [];
        model.users = [];

        function init() {
            findAllUsers();
            findAllReviews();
            findRequests();
        }

        init();

        function approveRequest(user)
        {
            user.status = 'APPROVED';
            user.roles.push('EXPERT');
            userService
                .updateUser(user._id, user)
                .then(function()
                {
                    init();
                })
        }

        function cancelRequest(user)
        {
            user.status = 'REJECTED';
            userService
                .updateUser(user._id, user)
                .then(function()
                {
                    init();
                })
        }

        function deleteReview(userId, reviewId)
        {
            movieService.deleteReview(userId, reviewId)
                .then(function(){
                    init();
                });

        }

        function findRequests()
        {
            userService
                .findRequests()
                .then(function(requests){
                    model.requests = requests.data;
                })
        }

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

        function findAllReviews()
        {
            movieService.findAllReviews()
                .then(function (reviews) {
                        model.reviews = reviews;
                        for(var r in reviews)
                        {
                            var review = reviews[r];
                            movieService
                                .findMovieById(review.movieId)
                                .then(function(movie)
                                {
                                    model.movies.push(movie.data);
                                });
                            userService.findUserById(review._user)
                                .then(function(user)
                                {
                                    model.users.push(user);
                                })
                        }
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