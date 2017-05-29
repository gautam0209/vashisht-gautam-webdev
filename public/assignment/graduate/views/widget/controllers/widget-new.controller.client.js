/**
 * Created by Gautam Vashisht on 5/26/2017.
 */

(function(){
    angular
        .module('WebAppMaker')
        .controller('widgetNewController',widgetNewController);

        function widgetNewController($routeParams,
                                        $location,
                                        widgetService){

            var model = this;

            var lists = [ 'Header', 'Label', 'HTML', 'Text Input', 'Link', 'Button', 'Image', 'Youtube', 'Data Table', 'Repeater'
            ];

            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];
            model.widgetType = $routeParams['widgetType'];
            model.lists = lists;
            model.mode = 'New';

            model.deleteWidget = deleteWidget;

            model.createWidget = createWidget;
            model.getUrl = getUrl;

            function init()
            {
                model.widget = widgetService.findWidgetById(model.widgetId);
                model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            }

            init();

            function getUrl(widgetType)
            {
                if(widgetType === 'Header')
                    model.widgetType = 'HEADING';
                else
                    model.widgetType = widgetType.toUpperCase();
                 $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/new/" + model.widgetType);
            }

            function deleteWidget(widgetId)
            {
                widgetService.deleteWidget(widgetId);
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
            }

            function createWidget(widget) {
                if(model.widgetType === 'Header')
                    widget.widgetType = 'HEADING';
                else
                    widget.widgetType = model.widgetType.toUpperCase();
                widget._id = (new Date()).getTime().toString();
                widgetService.createWidget(model.pageId, widget);
                console.log(widget);
                $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
            }

        }
})();