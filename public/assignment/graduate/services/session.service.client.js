/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .factory('sessionService',sessionService);

    function sessionService($http)
    {

        var url;
       var api={
            putUrl:putUrl,
           getUrl:getUrl
       };

       return api;

       function putUrl(url1) {
           url=url1;
       }

        function getUrl() {
            var temp=url;
            url="";
            return temp;
        }

    }

})();