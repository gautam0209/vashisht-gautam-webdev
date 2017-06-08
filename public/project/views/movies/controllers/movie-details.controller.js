/**
 * Created by Gautam Vashisht on 6/7/2017.
 */

(function (){
    angular
        .module('WebAppProj')
        .controller('detMovieController',detMovieController);

    function detMovieController($http, $location, movieService)
    {

        var model = this;


        function init()
        {
           model.movie = movieService.getMovie();
        }

        init();

    }

})();