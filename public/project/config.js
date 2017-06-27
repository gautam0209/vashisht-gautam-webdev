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
            .when('/user',{
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

            .when('/profile',{
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })

            // .when('/searchMovie',{
            //     templateUrl: 'views/movies/templates/movie-search.view.client.html',
            //     controller: 'movieController',
            //    s controllerAs: 'model'
            // })
            .when('/current/movies',{
                templateUrl: 'views/movies/templates/movie-current.view.client.html',
               controller: 'curMovieController',
               controllerAs: 'model'
            })

            .when('/myMovies',{
                templateUrl: 'views/movies/templates/movie-favorite.view.client.html',
                controller: 'favMovieController',
                controllerAs: 'model',
                resolve: {
                    currentUser:checkLoggedIn
                }
            })
            .when('/myReviews',{
                templateUrl: 'views/movies/templates/my-movie-reviews.view.client.html',
                controller: 'myRevController',
                controllerAs: 'model',
                resolve: {
                    currentUser:checkLoggedIn
                }
            })

                .when(
                    '/admin', {
                        templateUrl: 'views/admin/templates/admin-home.view.client.html',
                        resolve:{
                            currentUser:checkAdmin
                        },
                        controller: 'adminMainController',
                        controllerAs: 'model'
                    }
                )

            .when(
                '/admin/users', {
                    templateUrl: 'views/admin/templates/admin-users.view.client.html',
                    resolve:{
                        currentUser:checkAdmin
                    },
                    controller: 'adminUsersController',
                    controllerAs: 'model'
                }
            )

            .when(
                '/admin/reviews', {
                    templateUrl: 'views/admin/templates/admin-reviews.view.client.html',
                    resolve:{
                        currentUser:checkAdmin
                    },
                    controller: 'adminReviewController',
                    controllerAs: 'model'
                }
            )
            .when(
                '/followingReviews', {
                    templateUrl: 'views/movies/templates/following-reviews.view.client.html',
                    resolve:{
                        currentUser:checkLoggedIn
                    },
                    controller: 'followingController',
                    controllerAs: 'model'
                }
            )

            .when(
                '/admin/requests', {
                    templateUrl: 'views/admin/templates/admin-requests.view.client.html',
                    resolve:{
                        currentUser:checkAdmin
                    },
                    controller: 'adminRequestsController',
                    controllerAs: 'model'
                }
            )


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

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .checkAdmin()
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