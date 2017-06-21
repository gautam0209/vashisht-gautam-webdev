/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppProj')
        .factory('userService',userService);

    function userService($http)
    {
        var api =
            {
                findUserByCredential: findUserByCredential,
                findUserById: findUserById,
                findUserByUserName: findUserByUserName,
                findAllUsers:findAllUsers,
                createUser:createUser,
                deleteUser:deleteUser,
                updateUser:updateUser,
                updateProfile:updateProfile,
                login: login,
                logout: logout,
                loggedin: loggedin,
                checkAdmin:checkAdmin,
                unregister: unregister,
                register:register,
                addReview: addReview
            };

        return api;

        function addReview(userId,
                           movieId,
                           review)
        {
            var url = "/api/project/review";

            var reviewObj = {
                userId: userId,
                movieId: movieId,
                review: review
            }
            return $http.post(url, reviewObj);
        }


        function findAllUsers()
        {
            var url = "/api/assignment/graduate/admin/users";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function register(userObj) {
            var url = "/api/assignment/graduate/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }


        function unregister() {
            var url = "/api/assignment/graduate/unregister";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout()
        {
            console.log("hello");
            var url = "/api/assignment/graduate/logout";

            return $http.post(url)
                .then(function(response){
                    console.log(response);
                    return response.data;
                })
        }

        function loggedin() {
            var url = "/api/assignment/graduate/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/assignment/graduate/admin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password)
        {
            var url = "/api/project/graduate/login";
            var credentials = {
                username: username,
                password: password
            }
            return $http.post(url, credentials)
                .then(function(response){
                    return response.data;

                })
        }

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

        function updateProfile(userId, user)
        {
            var url="/api/assignment/graduate/user";
            return $http.put(url, user)
                .then(function(response){
                    return response.data;
                });
        }

    }

})();