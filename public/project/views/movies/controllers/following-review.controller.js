(function (){
    angular
        .module('WebAppProj')
        .controller('followingController',followingController);

    function followingController($routeParams,
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

        model.movies = [];
        model.reviews = [];

        function init() {

            console.log("init");

            model.reviews =[];
            for(var f in model.currentUser.follow)
            {
                var followId = model.currentUser.follow[f];
                movieService
                    .findAllReviewsByFollow(followId)
                    .then(function (response) {
                        model.reviews = model.reviews.concat(response.data);
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

            console.log()


            // for(var r in model.reviews)
            // {
            //     var review = model.reviews[r];
            //     userService
            //         .findUserById(review._user)
            //         .then(function(user)
            //         {
            //             console.log(user);
            //             model.users.push(user.data);
            //         });
            // }


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
                    console.log(movie);
                    return movie.title;
                });
        }



    }
})();