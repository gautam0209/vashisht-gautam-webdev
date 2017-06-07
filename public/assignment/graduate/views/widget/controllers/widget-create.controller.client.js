/**
 * Created by Gautam Vashisht on 5/26/2017.
 */

(function(){
    angular
        .module('WebAppMaker')
        .controller('widgetCreateController',widgetCreateController);

    function widgetCreateController($routeParams,
                                 $location,
                                 widgetService,
                                    sessionService){

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
        model.getTemplateUrl=getTemplateUrl;

        model.createWidget = createWidget;
        model.getUrl = getUrl;


        function init()
        {
            //model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            widgetService.findWidgetsByPageId(model.pageId)
                .then(function(widgets){
                    model.widgets = widgets
                })

                    var temp=sessionService.getUrl();
                    if(temp){
                        model.widget = {
                            url:temp,
                            width: '100%'
                        }
                    }

        }

        init();

        function getUrl(widgetType)
        {
            model.widgetType = widgetType;
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/new/" + widgetType);
        }

        function deleteWidget(widgetId)
        {
            widgetService
                .deleteWidget(widgetId)
                .then(function(){});
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

        function createWidget(widget) {
            if(model.widgetType === 'Header')
                widget.widgetType = 'HEADING';
            else
                widget.widgetType = model.widgetType.toUpperCase();
            widget._id = (new Date()).getTime().toString();

            widgetService.createWidget(model.pageId, widget)
                .then(function(){});

            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }

        function getTemplateUrl() {
            return "views/widget/templates/widget-"+ model.widgetType.toLowerCase()+ "-edit.view.client.html";
        }

    }
})();