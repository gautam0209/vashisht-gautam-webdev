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
        model.follow = follow;

        function init() {
            movieService.
            findMovieById(model.movieId)
                .then(function(movie) {
                    model.movie = movie.data;
                });
            movieService.getReviews(model.movieId)
                .then(function (response) {
                    model.reviews = response.data.results;
                    movieService
                        .getLocalReview(model.movieId)
                        .then(function(reviews)
                        {
                            model.reviews = model.reviews.concat(reviews);
                            model.reviews.sort(function(a,b){
                               return (a.star >  b.star)?-1:1;
                            })
                        }, function(err){
                            console.log(err);
                        })

                });


        }

        init();


        function follow(expertId)
        {
            userService
                .follow(model.currentUser._id, expertId)
                .then(function(){
                    $location.url('#!/movie/' + model.movieId + '/review');
                })
        }

        function submitReview(movieId, review)
        {

            userService
                .addReview(currentUser._id, movieId, review)
                .then(function(){

                    //

                });
            //$location.url('/movie/' + movieId + '/review');
            $("#review_"+movieId).toggle();

            init();
        }
    }
})();