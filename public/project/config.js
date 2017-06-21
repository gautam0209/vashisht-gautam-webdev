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
                templateUrl: 'views/home/templates/home-page.view.client.html',
                controller: 'homeController',
                controllerAs: 'model',
                resolve: {
                    currentUser:checkCurrentUser
                }
            })
            .when('/movie/:movieId',{
                templateUrl: 'views/movies/templates/movie-details.view.client.html',
                controller: 'detMovieController',
                controllerAs: 'model',
                resolve: {
                    currentUser:checkCurrentUser
                }
            })
            .when('/movie/:movieId/review',{
                templateUrl: 'views/movies/templates/movie-reviews.view.client.html',
                controller: 'revMovieController',
                controllerAs: 'model',
                resolve: {
                    currentUser:checkCurrentUser
                }
            })
            .when('/login',{
                templateUrl: 'views/user/templates/movie-login.view.client.html',
                 controller: 'loginController',
                 controllerAs: 'model'
            })
            .when('/register',{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user',{
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

            .when('/movie/:movieId',{
                templateUrl: 'views/movies/templates/movie-details.view.client.html',
                controller: 'detMovieController',
                controllerAs: 'model',
                resolve: {
                    currentUser:checkCurrentUser
                }
            })
    }

    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                    // $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

})();