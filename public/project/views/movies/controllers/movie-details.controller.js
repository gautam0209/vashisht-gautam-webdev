/**
 * Created by Gautam Vashisht on 6/7/2017.
 */

(function (){
    angular
        .module('WebAppProj')
        .controller('detMovieController',detMovieController);

    function detMovieController($http,
                                $location,
                                $routeParams,
                                currentUser,
                                movieService)
    {

        var model = this;
        model.currentUser = currentUser;
        model.submitReview = submitReview;


       // model.getReviews = getReviews;


        function init()
        {
          // model.movie = movieService.getMovie();

           model.movieId =  $routeParams['movieId'];
           console.log(model.currentUser);

           movieService.
               findMovieById(model.movieId)
               .then(function(movie) {
                   model.movie = movie.data;
                   console.log(model.movie);
                   movieService.getReviews(model.movieId)
                       .then(function(response){
                           model.reviews = response.data.results;
                           //model.reviews.push(movieService.getLocalReview(model.movie.id));
                           model.reviews =  model.reviews.concat(movieService.getLocalReview(model.movieId));
                       })

               });


            model.mode = movieService.getMode();
        }

        init();

        function submitReview(movieId, review)
        {
            console.log("movieId:" + movieId);
            movieService
                .addReview(currentUser._id, movieId, review)
                .then(function(){

                });

        }

    }

})();