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
        var mId;
        var urlBaseCur = "https://api.themoviedb.org/3/movie/now_playing?api_key="+ key + "&language=en-US";
        var urlBase = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=mvName";
        var urlBaseRev = "http://api.themoviedb.org/3/movie/ID/reviews?api_key=" + key;

        var movie;



        var api =
            {
                getMovies:getMovies,
                searchMovie: searchMovie,
                putMovie: putMovie,
                getMovie: getMovie,
                getReviews: getReviews
            };


        return api;

        function putMovie(mov)
        {
            movie = mov;

        }

        function getMovie()
        {
            return movie;
        }

        function getMovies()
        {
            return $http.get(urlBaseCur);
        }

        function searchMovie(movieName)
        {
            var url = urlBase.replace("mvName",movieName);
            return $http.get(url);
        }

        function getReviews(id)
        {
            mid = id;
            console.log("id is:" + mid);
            var url = urlBaseRev.replace("ID",mid);
            //url = "http://api.themoviedb.org/3/movie/83542/reviews?api_key=56ebcfaec1cf2e96e005ccf98f7feeb6";
            console.log(url);

            return $http.get(url);
        }
    }

})();