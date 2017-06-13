(function (){
    angular
        .module('WebAppProj')
        .factory('userService',userService);


    var user = [
        {_id: 1, name: "Gautam", username: "g", password: "g"}
    ];

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
            // var url="/api/assignment/graduate/user?username="+username+"&password=" + password;
            // return $http.get(url)
            //     .then(function(response){
            //         return response.data;
            //     });
            if(username == 'g' && password == 'g')
                return user[0];
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