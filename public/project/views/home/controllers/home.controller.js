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
                    var v = response.data;
                    model.currentMovies = JSON.parse(v).results;
                },function(){})

            movieService.getPopularMovies()
                .then(function(response){
                    var v = response.data;
                    model.popularMovies = JSON.parse(v).results;
                },function(){})
            movieService.getUpcomingMovies()
                .then(function(response){
                    var v = response.data;
                    model.upcomingMovies = JSON.parse(v).results;
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
                    var v = response.data;
                    model.searchMovies = JSON.parse(v).results;
                    if(!model.searchMovies[0])
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