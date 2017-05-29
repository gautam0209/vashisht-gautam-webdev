/**
 * Created by Gautam Vashisht on 5/26/2017.
 */

(function(){
    angular
        .module('WebAppMaker')
        .controller('widgetListController',widgetListController);

        function widgetListController($sce,
                                      $routeParams,
                                      widgetService){

            var model = this;
            model.trust = trust;
            model.getYouTubeEmbedURL = getYouTubeEmbedURL;
            model.widgetUrl = widgetUrl;

            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];


            function init()
            {
                model.widget = widgetService.findWidgetById(model.widgetId);
                model.widgets = widgetService.findWidgetsByPageId(model.pageId);
                console.log(model.widgets);

            }

            init();

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