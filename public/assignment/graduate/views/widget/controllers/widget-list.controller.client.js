/**
 * Created by Gautam Vashisht on 5/26/2017.
 */

(function(){
    angular
        .module('WebAppMaker')
        .controller('widgetListController',widgetListController);

        function widgetListController($sce,
                                      $routeParams,
                                      currentUser,
                                      widgetService){

            var model = this;
            model.trust = trust;
            model.getYouTubeEmbedURL = getYouTubeEmbedURL;
            model.widgetUrl = widgetUrl;
            model.sortWidget = sortWidget;

           // model.userId = $routeParams['userId'];
            model.userId = currentUser._id;
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];


            function init()
            {
                widgetService.findWidgetsByPageId(model.pageId)
                    .then(function(widgets){
                        model.widgets = widgets
                        console.log(widgets);
                    },
                    function(){});
            }

            init();

            function sortWidget(indexArr)
            {
                widgetService.sortWidget(model.pageId, indexArr)
                    .then(function(){
                        model.message = "Widget Sorted Successfully."
                    },
                    function(){
                        model.message = "Widget Sorting Failed."
                    });
            }

            function trust(html)
            {
                //scrubbing the html
                return $sce.trustAsHtml(html);
            }

            function getYouTubeEmbedURL(linkURL){
                var embedURL = "https://youtube.com/embed/";
                var linkURLParts = linkURL.split("/");
                embedURL += linkURLParts[linkURLParts.length - 1];
                return $sce.trustAsResourceUrl(embedURL);
            }

            function widgetUrl(widget)
            {
                var url = 'views/widget/templates/widget-'
                    + widget.widgetType.toLowerCase() + '.view.client.html';
                return url;
            }

        }
})();