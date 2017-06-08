/**
 * Created by Gautam Vashisht on 6/7/2017.
 */

(function (){
    angular
        .module('WebAppProj')
        .controller('curMovieController',curMovieController);

    function curMovieController($http, $location, movieService)
    {

        var model = this;

        model.data = [];
        model.movies = [];
        model.searchMovie = searchMovie;
        model.getRating = getRating;

        function init()
        {
            movieService.getMovies()
                .then(function(response){
                    model.data = response.data.results;
                    console.log(response.data.results);
                })
        }

        init();

        function getRating(movieName)
        {
            for(var m in model.data)
            {
                var movie = model.data[m];

                console.log("here");

                if(movie.title.toLowerCase().valueOf() == movieName.toLowerCase().valueOf())
                {
                    console.log("here1");
                    model.rating = movie.vote_average;
                }
            }
        }

        function searchMovie(movieName)
        {
            for(var m in model.data)
            {
                var movie = model.data[m];

                if(movie.title.toLowerCase().indexOf(movieName.toLowerCase()) !== -1)
                {
                    console.log("Inside");
                    model.movies.push(movie);
                }
            }
        }

    }

})();