(function (){
    angular
        .module('WebAppProj')
        .controller('favMovieController',favMovieController);

    function favMovieController(currentUser,
                            userService,
                            $location,
                            movieService)
    {
        var model = this;

        model.searchMovie = searchMovie;
        model.logout = logout;

        model.currentUser = currentUser;
        model.movieDetailView = movieDetailView;
        model.putProfileTrace = putProfileTrace;
        model.favMovies = [];
        model.watMovies = [];

        function init()
        {
            if(model.currentUser._id)
            {
                for(var m in currentUser.movieLiked)
                {
                    var movieId = currentUser.movieLiked[m];
                    movieService
                        .findMovieById(movieId)
                        .then(function(movie)
                        {
                            model.favMovies.push(movie.data);
                        })
                }
            }

            if(model.currentUser._id)
            {
                for(var m in currentUser.movieWatched)
                {
                    var movieId = currentUser.movieWatched[m];
                    movieService
                        .findMovieById(movieId)
                        .then(function(movie)
                        {
                            model.watMovies.push(movie.data);
                        })
                }
            }

            model.returnPath = movieService.getPath();

        }

        init();

        function putProfileTrace()
        {
            userService
                .putProfileTrace('/myMovies');
            $location.url('/profile');
        }


        function movieDetailView(movieId)
        {
            movieService
                .putPath('myMovies');
            $location.url('/movie/'+ movieId);
        }

        function logout()
        {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function searchMovie(movieName)
        {
            movieService.searchMovie(movieName)
                .then(function(response){
                    model.searchMovies = response.data.results;
                })
        }

    }

})();