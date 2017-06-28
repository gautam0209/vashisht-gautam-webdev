(function (){
    angular
        .module('WebAppProj')
        .controller('homeController',homeController);

    function homeController(currentUser,
                            userService,
                            $location,
                            movieService)
    {
        var model = this;

        model.searchMovie = searchMovie;
        model.logout = logout;
        model.movieDetailView = movieDetailView;
        model.myMovieView = myMovieView;
        model.putProfileTrace = putProfileTrace;
        model.searchMovies = [];
        model.error = '';

        function init()
        {
            model.currentUser = currentUser;
            movieService.getMovies()
                .then(function(response){
                    model.currentMovies = response.data.results;
                },function(){})

            movieService.getPopularMovies()
                .then(function(response){
                    model.popularMovies = response.data.results;
                },function(){})
            movieService.getUpcomingMovies()
                .then(function(response){
                    model.upcomingMovies = response.data.results;
                },function(){})
        }

        init();

        function putProfileTrace()
        {
            userService
                .putProfileTrace('home');
            $location.url('/profile');
        }


        function myMovieView()
        {
            movieService
                .putPath('home');
            $location.url('/myMovies');
        }

        function movieDetailView(movieId)
        {
            movieService
                .putPath('home');
            $location.url('/movie/'+ movieId);
        }

        function logout()
        {
            userService
                .logout()
                .then(function () {
                    $location.url('#!/');
                });
        }

        function searchMovie(movieName)
        {
            movieService
                .searchMovie(movieName)
                .then(function(response){
                    model.searchMovies = response.data.results;
                    if(!response.data.results[0])
                        model.error = "No movies Found.";
                    else
                        model.error="";
                }, function(err){
                    model.searchMovies = [];
                    model.error="No movies Found.";
                })
        }

    }

})();