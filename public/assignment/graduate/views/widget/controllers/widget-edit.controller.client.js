/**
 * Created by Gautam Vashisht on 5/26/2017.
 */

(function(){
    angular
        .module('WebAppMaker')
        .controller('widgetEditController',widgetEditController);

        function widgetEditController($routeParams,
                                        $location,
                                        widgetService){

            var model = this;

            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];
            model.widgetId = $routeParams['widgetId'];
            model.mode='Edit';


            model.deleteWidget = deleteWidget;
            model.updateWidget = updateWidget;

            function init()
            {
                model.widget = widgetService.findWidgetById(model.widgetId);
                model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            }

            init();

            function updateWidget(widget)
            {
                widgetService.updateWidget(model.widgetId, widget);
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
            }

            function deleteWidget(widgetId)
            {
                widgetService.deleteWidget(widgetId);
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
            }



        }
})();