/**
 * Created by Gautam Vashisht on 6/5/2017.
 */

(function(){
    angular
            .module('WebAppMaker')
            .directive('wbdvSortable',wbdvSortable);

    function wbdvSortable() {

        function linkFunction(scope, element) {
            startIndex = [];

            element.sortable({

                axis: 'y',

                handle: 'a.draggable',

                start: function(event, ui){
                    startIndex[0] = ui.item.index();
                },

                stop: function(event,ui){
                    startIndex[1] = ui.item.index();
                    scope.getSortedIndexArray({'indexArr' : startIndex})
                }
            });
        }

        return{
           scope: {
               getSortedIndexArray: '&getIndexArray'
        },
            link: linkFunction
        }
    }
})();