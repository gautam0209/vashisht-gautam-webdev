/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .factory('abc',abc);

    function abc($http)
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