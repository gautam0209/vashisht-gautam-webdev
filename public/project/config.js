/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function(){
    angular
        .module("WebAppProj")
        .config(configure);

    function configure($routeProvider)
    {

        $routeProvider
            .when('/',{
                templateUrl: 'views/user/templates/movie-login.view.client.html',
                 controller: 'loginController',
                 controllerAs: 'model'
            })

        $routeProvider
            .when('/user/:userId',{
                templateUrl: 'views/movies/templates/movie-start.view.client.html'
                // controller: 'movieStartController',
                // controllerAs: 'model'
            })

            .when('/searchMovie',{
                templateUrl: 'views/movies/templates/movie-search.view.client.html',
                controller: 'movieController',
                controllerAs: 'model'
            })
            .when('/current/movies',{
                templateUrl: 'views/movies/templates/movie-current.view.client.html',
               controller: 'curMovieController',
               controllerAs: 'model'
            })

            .when('/movie/details',{
                templateUrl: 'views/movies/templates/movie-details.view.client.html',
                controller: 'detMovieController',
                controllerAs: 'model'
            })
    }
})();