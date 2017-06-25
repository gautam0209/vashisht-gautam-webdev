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
        var urlBaseRev = "https://api.themoviedb.org/3/movie/ID/reviews?api_key=" + key;
        var urlById = "https://api.themoviedb.org/3/movie/ID?api_key=" + key + "&append_to_response=credits&language=en-US";
        var urlBasePop = "https://api.themoviedb.org/3/movie/popular?api_key="+key+"&language=en-US";
        var urlBaseUp = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + key + "&language=en-US";

        var movie;

        var movies = [];

        var path;






        var api =
            {
                getMovies:getMovies,
                getPopularMovies:getPopularMovies,
                getUpcomingMovies:getUpcomingMovies,
                searchMovie: searchMovie,
               // putMovie: putMovie,
                //getMovie: getMovie,
                getReviews: getReviews,
                deleteReview: deleteReview,
                getLocalReview:getLocalReview,
                findMovieById:findMovieById,
                findAllReviews:findAllReviews,
                findAllReviewsByUserId:findAllReviewsByUserId,
                findAllReviewsByFollow:findAllReviewsByFollow,
                updateReview:updateReview,
                putPath:putPath,
                getPath:getPath
            };


        return api;


        function putPath(bPath)
        {
            path = bPath;

        }

        function getPath()
        {
            return path;
        }

        function findAllReviewsByFollow(followId)
        {
                var url = '/api/project/follow/' + followId;
                return $http.get(url);
        }

        function deleteReview(userId, reviewId)
        {
            var url ='/api/project/user/' + userId + '/review/' + reviewId ;
            return $http.delete(url);
        }
        function updateReview(review)
        {
            var url = '/api/project/review';
            return $http.put(url,review);
        }

        function findAllReviewsByUserId(userId)
        {
            var url = '/api/user/' + userId + '/allReviews';
            return $http.get(url);
        }

        function getMovies()
        {
            return $http
                    .get(urlBaseCur);
        }

        function getPopularMovies()
        {
            return $http
                .get(urlBasePop);
        }

        function getUpcomingMovies()
        {
            return $http
                .get(urlBaseUp);
        }

        function searchMovie(movieName)
        {
            var url = urlBase.replace("mvName",movieName);
            return $http.get(url);
        }

        function findMovieById(movieId)
        {
            var url = urlById.replace("ID",movieId);
            return $http.get(url);
        }

        function getReviews(id)
        {
            mid = id;
            var url = urlBaseRev.replace("ID",mid);
            //url = "http://api.themoviedb.org/3/movie/83542/reviews?api_key=56ebcfaec1cf2e96e005ccf98f7feeb6";

            return $http.get(url);
        }

        function getLocalReview(movieId)
        {
            var url = '/api/movie/' + movieId + '/localReview';

            return $http.get(url)
                .then(function(response){
                    return response.data;
                }, function(err){
                    console.log(err);
                });

        }
        function findAllReviews()
        {
            var url = "/api/project/admin/reviews";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

    }

})();