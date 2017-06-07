
(function(){
    angular
        .module('WebAppMaker')
        .controller('widgetFlickrController',widgetFlickrController);

    function widgetFlickrController(flickrService, widgetService, $routeParams, $location,abc){

        var model = this;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        model.userId = $routeParams['userId'];
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
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {
                url: url,
                width: '100%'
            };

            abc.putUrl(url);

            // model.widget.url = url;
            // model.widget.width = width;

           // widgetService
           //     .updateWidget(model.widgetId, widget);

            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + model.widgetId);
        }

    }
})();