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
                templateUrl: 'views/movies/templates/movie-search.view.client.html',
                controller: 'movieController',
                controllerAs: 'model'
            })
            // .when('/movies',{
            //     templateUrl: 'views/movies/templates/movie-data.view.client.html',
            //    controller: 'movieController',
            //    controllerAs: 'model'
            // })

    }
})();