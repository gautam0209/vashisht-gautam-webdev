/**
 * Created by Gautam Vashisht on 6/7/2017.
 */

(function (){
    angular
        .module('WebAppProj')
        .controller('detMovieController',detMovieController);

    function detMovieController($http, $location, movieService)
    {

        var model = this;

       // model.getReviews = getReviews;


        function init()
        {
           model.movie = movieService.getMovie();
          movieService.getReviews(model.movie.id)
               .then(function(response){
                   model.reviews = response.data.results;
                   console.log(response.data.results);
               })
        }

        init();

    }

})();