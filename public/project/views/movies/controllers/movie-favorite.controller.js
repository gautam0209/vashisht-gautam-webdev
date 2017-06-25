/**
 * Created by Gautam Vashisht on 6/7/2017.
 */

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

        // model.data = [];
        // model.movies = [];
        model.searchMovie = searchMovie;
        model.logout = logout;
        // model.getRating = getRating;
        // model.movieDetails = movieDetails;
        // model.submitReview = submitReview;
        model.currentUser = currentUser;
        model.movieDetailView = movieDetailView;
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

        }

        init();

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



        // function submitReview(movieId, review)
        // {
        //     movieService.addReview(movieId, review);
        //
        // }
        //
        // function movieDetails(movieId){
        //
        //     for(var m in model.data)
        //     {
        //         var movie = model.data[m];
        //
        //         if(movie.id === movieId)
        //         {
        //             //movieService.putMovie(movie);
        //             $location.url('/movie/' + movieId);
        //         }
        //     }
        // }
        //
        // function getRating(movieName)
        // {
        //     for(var m in model.data)
        //     {
        //         var movie = model.data[m];
        //
        //         console.log("here");
        //
        //         if(movie.title.toLowerCase().valueOf() == movieName.toLowerCase().valueOf())
        //         {
        //             console.log("here1");
        //             model.rating = movie.vote_average;
        //         }
        //     }
        // }
        //
        // function searchMovie(movieName)
        // {
        //     for(var m in model.data)
        //     {
        //         var movie = model.data[m];
        //
        //         if(movie.title.toLowerCase().indexOf(movieName.toLowerCase()) !== -1)
        //         {
        //             console.log("Inside");
        //             model.movies.push(movie);
        //         }
        //     }
        // }

        function searchMovie(movieName)
        {
            movieService.searchMovie(movieName)
                .then(function(response){
                    model.searchMovies = response.data.results;
                })
        }

    }

})();