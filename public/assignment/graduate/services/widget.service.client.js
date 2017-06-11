/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .factory('widgetService',widgetService);

    function widgetService($http)
    {

        var api =
            {
                deleteWidget:deleteWidget,
                findWidgetById:findWidgetById,
                findWidgetsByPageId:findWidgetsByPageId,
                updateWidget:updateWidget,
                createWidget: createWidget,
                sortWidget: sortWidget
            };

        return api;

        function sortWidget(pageId, indexArr){
            var url = "/page/" + pageId + "/widget?initial=" + indexArr[0] + "&final=" + indexArr[1];
            return $http.put(url)
                .then(function(response){
                        return response.data;
                    },
                    function(){
                        return null
                    });
        }

        function findWidgetsByPageId(pageId)
        {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function(response){
                    return response.data
                },
                function(){
                    return null;
                });
        }

        function findWidgetById(widgetId)
        {
            var url = "/api/widget/" + widgetId;
            return $http.get(url)
                .then(function(response){
                    return response.data
                },
                function(){
                    return null;
                });
        }

        function createWidget(pageId, widget){
                widget.pageId = pageId;
                var url = "/api/page/" + pageId + "/widget";
                return $http.post(url,widget)
                    .then(function(response){
                        return response.data
                    });

        }

        function updateWidget(widgetId, widget) {
            var url ="/api/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function(response){
                    return response.data
                });
        }

        function deleteWidget(widgetId) {

            var url ="/api/widget/" + widgetId;
            return $http.delete(url)
                .then(function(response){
                    return response.data
                });
        }

    }

})();