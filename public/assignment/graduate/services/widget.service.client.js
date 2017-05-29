/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .factory('widgetService',widgetService);

    function widgetService()
    {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem cvnbm ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api =
            {
                deleteWidget:deleteWidget,
                findWidgetById:findWidgetById,
                findWidgetsByPageId:findWidgetsByPageId,
                updateWidget:updateWidget,
                createWidget: createWidget
            };

        return api;

        function findWidgetsByPageId(pageId)
        {
            var results = [];
            for(var w in widgets)
            {
                var widget = widgets[w];
                if(widget.pageId === pageId)
                    results.push(widget);
            }

            return results;
        }

        function findWidgetById(widgetId)
        {
            for(var w in widgets)
            {
                var widget = widgets[w];
                if(widget._id === widgetId)
                    return angular.copy(widget);
            }

            return null;
        }

        function createWidget(pageId, widget){
                widget.pageId = pageId;
                widgets.push(widget);

        }

        function updateWidget(widgetId, widget) {
            for(var w in widgets)
            {
                var wid = widgets[w];
                if(wid._id == widgetId)
                {
                    widgets[w].text = widget.text;
                    widgets[w].size = widget.size;
                    widgets[w].name = widget.name;
                    widgets[w].url = widget.url;
                    widgets[w].width = widget.width;
                }
            }
        }

        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);

            widgets.splice(index, 1);
        }

    }

})();