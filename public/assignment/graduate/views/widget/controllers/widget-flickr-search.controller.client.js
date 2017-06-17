
(function(){
    angular
        .module('WebAppMaker')
        .controller('widgetFlickrController',widgetFlickrController);

    function widgetFlickrController(flickrService,
                                    widgetService,
                                    $routeParams,
                                    currentUser,
                                    $location){

        var model = this;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.mode = 'Edit';

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


            $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + model.widgetId);
        }

    }
})();