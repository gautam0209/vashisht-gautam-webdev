(function (){
    angular
        .module('WebAppProj')
        .controller('myRevController',myRevController);

    function myRevController($routeParams,
                                $location,
                                currentUser,
                                movieService) {

        var model = this;

        model.movieId = $routeParams['movieId'];
        model.currentUser = currentUser;
        model.getMovieTitle = getMovieTitle;
        model.selectReview = selectReview;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;

        model.movies = [];

        function init() {
            movieService
                .findAllReviewsByUserId(model.currentUser._id)
                .then(function (response) {
                    model.reviews = response.data;
                    for(var r in model.reviews)
                    {
                        var review = model.reviews[r];
                        movieService
                            .findMovieById(review.movieId)
                            .then(function(movie)
                            {
                                model.movies.push(movie.data);
                            });
                    }
                });


        }

        init();

        function selectReview(review, title)
        {
            model.review = angular.copy(review);
            model.title = title;

        }

        function updateReview(review)
        {
            movieService
                .updateReview(review)
                .then(function(){
                    model.title="";
                    $location.url('#!/myReviews');
                });
        }

        function deleteReview(reviewId)
        {
            movieService
                .deleteReview(model.currentUser._id, reviewId)
                .then(function(){
                    $location.url('#!/myReviews');
                });
        }

        function getMovieTitle(movieId)
        {
            return movieService
                     .findMovieById(movieId)
                .then(function(movie)
                {
                    console.log(movie);
                    return movie.title;
                });
        }



    }
})();