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
        model.putProfileTrace = putProfileTrace;
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
                            reviews.sort(function(a,b){
                                return (a.star >  b.star)?-1:1;
                            })

                            model.reviews = reviews.concat(model.reviews);

                            console.log(model.reviews);
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
                .then(function(followUser){
                    console.log(followUser);
                    init();
                    $location.url('/movie/' + model.movieId + '/review');
                })


        }

        function putProfileTrace()
        {
            userService
                .putProfileTrace('/movie/' + model.movieId + '/review');
            $location.url('/profile');
        }

        function submitReview(movieId, content)
        {

            console.log('submitting review');

            movieService
                .findMovieById(movieId)
                .then(function(movie)
            {
                userService
                    .addReview(currentUser._id, movie.data.id, movie.data.title, movie.data.poster_path, content)
                    .then(function(){

                    }, function(){});
            });

            $("#review_"+movieId).toggle();


            init();
            $location.url('/movie/' + movieId + '/review');

        }
    }
})();