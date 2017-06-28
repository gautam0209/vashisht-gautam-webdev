(function (){
    angular
        .module('WebAppProj')
        .controller('adminRequestsController',adminRequestsController);

    function adminRequestsController(userService,
                             movieService,
                             $location,
                             currentUser) {

        var model = this;
        model.currentUser = currentUser;
        model.getUserById = getUserById;
        model.getMovieById = getMovieById;
        model.findRequests = findRequests;
        model.approveRequest = approveRequest;
        model.cancelRequest = cancelRequest;
        model.putProfileTrace = putProfileTrace;
        model.movies = [];
        model.users = [];

        function init() {
            findRequests();
        }

        init();

        function putProfileTrace()
        {
            userService
                .putProfileTrace('admin_requests');
            $location.url('/profile');
        }

        function approveRequest(user)
        {
            user.status = 'APPROVED';
            //user.roles.push('EXPERT');
            user.roles='EXPERT';
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

        function findRequests()
        {
            userService
                .findRequests()
                .then(function(requests){
                    model.requests = requests.data;
                })
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
    }
})();