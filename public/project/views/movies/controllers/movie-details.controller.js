
(function (){
    angular
        .module('WebAppProj')
        .controller('detMovieController',detMovieController);

    function detMovieController($routeParams,
                                currentUser,
                                userService,
                                movieService)
    {

        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser._id;
        model.likeMovie = likeMovie;
        model.unLikeMovie = unLikeMovie;
        model.watchMovie = watchMovie;
        model.unWatchMovie = unWatchMovie;

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

           if(currentUser._id)
                userService
                    .isLike(model.userId,model.movieId)
                    .then(function(like){
                        model.like = like;
                    },function(){});

            if(currentUser._id)
                userService
                    .isWatch(model.userId,model.movieId)
                    .then(function(watch){
                        model.watch = watch;
                    },function(){});
        }

        init();

        function likeMovie()
        {
            userService
                .likeMovie(model.userId, model.movieId)
                .then(function(like){
                    model.like = like;
                })
        }

        function watchMovie()
        {
            userService
                .watchMovie(model.userId, model.movieId)
                .then(function(watch){
                    model.watch = watch;
                })
        }

        function unLikeMovie()
        {
            userService
                .unLikeMovie(model.userId, model.movieId)
                .then(function(){
                    model.like = '';
                })
        }

        function unWatchMovie()
        {
            userService
                .unWatchMovie(model.userId, model.movieId)
                .then(function(){
                    model.watch = '';
                })
        }

    }

})();