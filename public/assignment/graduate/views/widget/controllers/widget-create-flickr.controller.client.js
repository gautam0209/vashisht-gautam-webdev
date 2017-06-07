
(function(){
    angular
        .module('WebAppMaker')
        .controller('widgetCreateFlickrController',widgetCreateFlickrController);

    function widgetCreateFlickrController(flickrService,
                                          widgetService,
                                          $routeParams,
                                          $location){

        var model = this;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.mode = 'New';

        function searchPhotos(searchTerm){
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo)
        {
            flickrService
                .selectPhoto(photo);

            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/new/IMAGE');
        }

    }
})();