/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .factory('flickrService',flickrService);

    function flickrService($http)
    {

        var key = "e7ab14f5cb0d79b72e6723a48b8159d1";
        var secret = "6fe1349eec9bb7df";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";




        var api =
            {
                searchPhotos:searchPhotos,
                selectPhoto: selectPhoto

            };

        return api;

        function searchPhotos(searchTerm)
        {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

        function selectPhoto(photo)
        {

        }


    }

})();