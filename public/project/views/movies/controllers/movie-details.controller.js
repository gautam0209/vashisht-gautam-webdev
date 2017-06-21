/**
 * Created by Gautam Vashisht on 6/7/2017.
 */

(function (){
    angular
        .module('WebAppProj')
        .controller('detMovieController',detMovieController);

    function detMovieController($routeParams,
                                currentUser,
                                movieService)
    {

        var model = this;
        model.currentUser = currentUser;
       // model.submitReview = submitReview;


       // model.getReviews = getReviews;


        function init()
        {
           model.movieId =  $routeParams['movieId'];
           console.log(model.currentUser);

           movieService.
               findMovieById(model.movieId)
               .then(function(movie) {
                   model.movie = movie.data;
                   console.log(model.movie);
               });
        }

        init();

    }

})();