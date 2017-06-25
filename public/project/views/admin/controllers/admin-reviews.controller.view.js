(function (){
    angular
        .module('WebAppProj')
        .controller('adminReviewController',adminReviewController);

    function adminReviewController(userService,
                             movieService,
                             currentUser) {

        var model = this;
        model.currentUser = currentUser;
        model.getMovieById = getMovieById;
        model.deleteReview = deleteReview;
        model.movies = [];
        model.users = [];

        function init() {
            findAllReviews();
        }

        init();

        function deleteReview(userId, reviewId)
        {
            movieService.deleteReview(userId, reviewId)
                .then(function(){
                    init();
                });

        }


        function findAllReviews()
        {
            movieService.findAllReviews()
                .then(function (reviews) {
                        model.reviews = reviews;
                        for(var r in reviews)
                        {
                            var review = reviews[r];
                            movieService
                                .findMovieById(review.movieId)
                                .then(function(movie)
                                {
                                    model.movies.push(movie.data);
                                });
                            userService.findUserById(review._user)
                                .then(function(user)
                                {
                                    model.users.push(user);
                                })
                        }
                });
        }

        function getMovieById(movieId)
        {
            movieService.findMovieById(movieId)
                .then(function(movie)
                    {
                        model.movie = movie.title;
                        console.log(model.movie);
                        return model.movie;
                    }
                )
        }
    }
})();