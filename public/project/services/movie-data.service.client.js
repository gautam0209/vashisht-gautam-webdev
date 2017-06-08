/**
 * Created by Gautam Vashisht on 6/7/2017.
 */

(function (){
    angular
        .module('WebAppProj')
        .factory('movieService',movieService);

    function movieService($http)
    {

        var key = "56ebcfaec1cf2e96e005ccf98f7feeb6";
        var urlBaseCur = "https://api.themoviedb.org/3/movie/now_playing?api_key="+ key + "&language=en-US";
        var urlBase = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=mvName";



        var api =
            {
                getMovies:getMovies,
                searchMovie: searchMovie
            };


        return api;

        function getMovies()
        {
            return $http.get(urlBaseCur);
        }

        function searchMovie(movieName)
        {
            var url = urlBase.replace("mvName",movieName);
            return $http.get(url);
        }


    }

})();