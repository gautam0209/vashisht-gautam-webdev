(function (){
    angular
        .module('WebAppProj')
        .controller('followerController',followerController);

    function followerController($routeParams,
                                $location,
                                currentUser,
                                userService,
                                movieService) {

        var model = this;

        model.movieId = $routeParams['movieId'];
        model.currentUser = currentUser;
        model.getMovieTitle = getMovieTitle;
        model.selectReview = selectReview;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;
        model.myMovieView = myMovieView;
        model.putProfileTrace = putProfileTrace;

        model.movies = [];
        model.reviews = [];

        function init() {

            model.followers =[];
            for(var f in model.currentUser.followers)
            {
                var followerId = model.currentUser.followers[f];
                userService
                    .findUserById(followerId)
                    .then(function (user) {
                        model.followers = model.followers.concat(user);

                    });
            }


        }

        init();

        function putProfileTrace()
        {
            userService
                .putProfileTrace('followers');
            $location.url('/profile');
        }

        function myMovieView()
        {
            movieService.putPath('myReviews');
            $location.url('/myMovies');
        }

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
                    $location.url('/myReviews');
                });
        }

        function deleteReview(reviewId)
        {
            movieService
                .deleteReview(model.currentUser._id, reviewId)
                .then(function(){
                    $location.url('/myReviews');
                });
        }

        function getMovieTitle(movieId)
        {
            return movieService
                     .findMovieById(movieId)
                .then(function(movie)
                {
                    model.movie = JSON.parse(movie.data);
                    return model.movie.title;
                });
        }



    }
})();