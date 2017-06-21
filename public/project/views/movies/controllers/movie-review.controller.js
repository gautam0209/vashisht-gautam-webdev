(function (){
    angular
        .module('WebAppProj')
        .controller('revMovieController',revMovieController);

    function revMovieController($routeParams,
                                currentUser,
                                movieService,
                                userService) {

        var model = this;

        model.movieId = $routeParams['movieId'];
        model.currentUser = currentUser;
        model.submitReview = submitReview;

        function init() {
            movieService.
            findMovieById(model.movieId)
                .then(function(movie) {
                    model.movie = movie.data;
                });
            movieService.getReviews(model.movieId)
                .then(function (response) {
                    model.reviews = response.data.results;
                    console.log(model.reviews[0]);
                    model.reviews = model.reviews.concat(movieService
                        .getLocalReview(model.movieId));
                });
        }

        init();

        function submitReview(movieId, review)
        {
            userService
                .addReview(currentUser._id, movieId, review)
                .then(function(){

                });

        }
    }
})();