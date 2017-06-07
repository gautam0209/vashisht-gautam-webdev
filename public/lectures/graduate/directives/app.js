
(function (){
    angular
        .module('DirectiveLecture', [])
        .directive('hello', helloTag)
        .directive('wdDraggable',wdDraggable);

    function wdDraggable(){
        function linkFunction(scope, element){
            element
        }
        return{
            link: linkFunction
        }
    }

    function helloTag(){
        return{
            //template:'<h2> hello world !!! </h2>',
            templateUrl: 'hello.html'
        }
    }
})();