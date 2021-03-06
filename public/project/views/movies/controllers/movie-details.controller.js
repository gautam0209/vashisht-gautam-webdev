
(function (){
    angular
        .module('WebAppProj')
        .controller('detMovieController',detMovieController);

    function detMovieController($routeParams,
                                $location,
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
        model.putProfileTrace = putProfileTrace;
        model.getPath = getPath;



        function init()
        {
           model.movieId =  $routeParams['movieId'];

           movieService.
               findMovieById(model.movieId)
               .then(function(movie) {
                   model.movie = JSON.parse(movie.data);
               });

           if(currentUser._id)
                userService
                    .isLike(model.userId,model.movieId)
                    .then(function(like){
                        model.like = like;
                    },function(){
                    });

            if(currentUser._id)
                userService
                    .isWatch(model.userId,model.movieId)
                    .then(function(watch){
                        model.watch = watch;
                    },function(){});

            //model.returnPath = movieService.getPath();
        }

        init();

        function getPath()
        {
            movieService
                .getPath()
                .then(function(response)
                {
                    if(response.data.text === 'home')
                        response.data.text = '/';
                    response.data.text = response.data.text.replace('_','/');
                    $location.url(response.data.text);
                })
        }

        function putProfileTrace()
        {
            userService
                .putProfileTrace('movie_' + model.movieId);
            $location.url('/profile');
        }

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