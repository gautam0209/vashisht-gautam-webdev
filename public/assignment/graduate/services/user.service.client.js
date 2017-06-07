/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .factory('userService',userService);

    function userService($http)
    {
        var api =
            {
                findUserByCredential: findUserByCredential,
                findUserById: findUserById,
                findUserByUserName: findUserByUserName,
                createUser:createUser,
                deleteUser:deleteUser,
                updateUser:updateUser
            };

        return api;

        function createUser(user)
        {
            var url="/api/assignment/graduate/user";
            return $http.post(url, user)
                .then(function(response){
                    return response.data;
                });
        }

        function findUserByUserName(userName) {
            var url="/api/assignment/graduate/user?username="+userName;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findUserById(userId)
        {
            var url = '/api/assignment/graduate/user/' + userId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function findUserByCredential(username, password)
        {
            var url="/api/assignment/graduate/user?username="+username+"&password=" + password;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
         }

        function deleteUser(userId){

            var url="/api/assignment/graduate/user/" + userId;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });
            }

        function updateUser(userId, user)
        {
            var url="/api/assignment/graduate/user/" + userId;
            return $http.put(url, user)
                .then(function(response){
                    return response.data;
                });
        }

    }

})();