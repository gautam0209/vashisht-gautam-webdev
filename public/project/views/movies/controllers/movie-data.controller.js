/**
 * Created by Gautam Vashisht on 6/7/2017.
 */

(function (){
    angular
        .module('WebAppProj')
        .controller('movieController',movieController);



    function movieController($http, $location)
    {

        var key = "56ebcfaec1cf2e96e005ccf98f7feeb6";
        var urlBase = "https://api.themoviedb.org/3/movie/now_playing?api_key="+ key + "&language=en-US";

        var model = this;

        model.data = [];
        model.movies = [];
        model.searchMovie = searchMovie;
        //model.single;

        function init()
        {
            $http.get(urlBase)
                .then(function (response){
                   model.data = response.data.results;
                });

        }

        init();

        function searchMovie(movieName)
        {
            console.log(movieName);

            for(var m in model.data)
            {
                var movie = model.data[m];

                if(movie.title.toLowerCase().indexOf(movieName.toLowerCase()) !== -1)
                {
                    console.log("Inside");
                    model.movies.push(movie);
                }
            }
        }


    }

})();