(function (){
    angular
        .module('WebAppProj')
        .controller('revMovieController',revMovieController);

    function revMovieController($routeParams,
                                $location,
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
                    console.log("Inside ser:");
                    movieService
                        .getLocalReview(model.movieId)
                        .then(function(reviews)
                        {
                            console.log(reviews);
                            model.reviews = model.reviews.concat(reviews);
                        }, function(err){
                            console.log(err);
                        })

                });
        }

        init();

        function submitReview(movieId, review)
        {
            userService
                .addReview(currentUser._id, movieId, review)
                .then(function(){

                });
            $location.url('/movie/' + movieId + '/review');

        }
    }
})();