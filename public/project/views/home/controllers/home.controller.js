/**
 * Created by Gautam Vashisht on 6/7/2017.
 */

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

        // model.data = [];
        // model.movies = [];
        model.searchMovie = searchMovie;
        // model.getRating = getRating;
        // model.movieDetails = movieDetails;
        // model.submitReview = submitReview;
        //model.currentUser = currentUser;
        model.logout = logout;
        model.searchMovies = [];
        model.error = '';

        function init()
        {
            model.currentUser = currentUser;
            movieService.getMovies()
                .then(function(response){
                    model.currentMovies = response.data.results;
                    console.log(model.currentMovies[0]);
                })

            movieService.getPopularMovies()
                .then(function(response){
                    model.popularMovies = response.data.results;
                    console.log(model.popularMovies[0]);
                })
            movieService.getUpcomingMovies()
                .then(function(response){
                    model.upcomingMovies = response.data.results;
                })
        }

        init();

        function logout()
        {
            userService
                .logout()
                .then(function () {
                    $location.url('#!/');
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