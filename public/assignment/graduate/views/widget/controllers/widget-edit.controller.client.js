/**
 * Created by Gautam Vashisht on 5/26/2017.
 */

(function(){
    angular
        .module('WebAppMaker')
        .controller('widgetEditController',widgetEditController);

        function widgetEditController($routeParams,
                                        $location,
                                        widgetService,
                                        sessionService){

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
                // model.widget = widgetService.findWidgetById(model.widgetId);
                widgetService.findWidgetById(model.widgetId)
                    .then(function(widget){
                        model.widget = widget

                            var temp=sessionService.getUrl();
                            if(temp){
                                model.widget.url=temp;
                            }
                    },
                    function(){});
                //model.widgets = widgetService.findWidgetsByPageId(model.pageId);
                widgetService.findWidgetsByPageId(model.pageId)
                    .then(function(widgets){
                        model.widgets = widgets
                    },
                    function(){});
            }

            init();

            function updateWidget(widget)
            {
                widgetService
                    .updateWidget(model.widgetId, widget)
                    .then(function(){
                        model.message = "Widget Update Successful."
                    },
                    function(){
                        model.message = "Widget Update Failed."
                    });
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
            }

            function deleteWidget(widgetId)
            {
                widgetService
                    .deleteWidget(widgetId)
                    .then(function(){
                        model.message = "Widget Deleted Successfully."
                    },
                    function () {
                        model.message = "Widget Deletion Failed."
                    });
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
            }



        }
})();