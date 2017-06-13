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
                   console.log(model.reviews);
                   //model.reviews.push(movieService.getLocalReview(model.movie.id));
                   console.log(movieService.getLocalReview(model.movie.id));
                  model.reviews =  model.reviews.concat(movieService.getLocalReview(model.movie.id));
               })
        }

        init();

    }

})();