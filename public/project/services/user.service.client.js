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
                addReview: addReview,
                isLike: isLike,
                likeMovie: likeMovie,
                unLikeMovie: unLikeMovie,
                isWatch: isWatch,
                watchMovie: watchMovie,
                unWatchMovie: unWatchMovie,
                follow: follow,
                findRequests: findRequests,
                getProfileTrace:getProfileTrace,
                putProfileTrace:putProfileTrace
            };

        var profilePath;

        return api;

        function putProfileTrace(trace)
        {
            profilePath = trace;
        }

        function getProfileTrace()
        {
            return profilePath;
        }

        function findRequests()
        {
            var url = '/api/project/requests';
            return $http.get(url);
        }

        function follow(userId, expertId)
        {
            var url = '/api/user/' + userId + '/follow/' + expertId;
            return $http.post(url);
        }


        function unLikeMovie(userId, movieId)
        {

            var url = '/api/user/' + userId + '/movie/' + movieId + '/unlike';

            return $http.post(url);
        }

        function likeMovie(userId, movieId)
        {

            var url = '/api/user/' + userId + '/movie/' + movieId + '/like';

            return $http.post(url);
        }

        function unWatchMovie(userId, movieId)
        {

            var url = '/api/user/' + userId + '/movie/' + movieId + '/unwatch';
            return $http.post(url);
        }

        function watchMovie(userId, movieId)
        {

            var url = '/api/user/' + userId + '/movie/' + movieId + '/watch';
            return $http.post(url);
        }

        function isLike(userId, movieId)
        {
            var url = '/api/user/' + userId + '/movie/' + movieId + '/like';

            return $http.get(url);
        }

        function isWatch(userId, movieId)
        {
            var url = '/api/user/' + userId + '/movie/' + movieId + '/watch';

            return $http.get(url);
        }

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
            var url = "/api/project/admin/users";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function register(userObj) {
            var url = "/api/project/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user)
        {
            var url="/api/project/user";
            return $http.post(url, user)
                .then(function(response){
                    return response.data;
                });
        }


        function unregister() {
            var url = "/api/project/unregister";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout()
        {
            var url = "/api/project/logout";

            return $http.post(url)
                .then(function(response){
                    return response.data;
                })
        }

        function loggedin() {
            var url = "/api/project/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/project/admin";
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



        function findUserByUserName(userName) {
            var url="/api/project/user?username="+userName;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findUserById(userId)
        {
            var url = '/api/project/user/' + userId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function findUserByCredential(username, password)
        {
            var url="/api/project/user?username="+username+"&password=" + password;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
         }

        function deleteUser(userId){

            var url="/api/project/user/" + userId;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });
            }

        function updateUser(userId, user)
        {
            var url="/api/project/user/" + userId;
            return $http.put(url, user)
                .then(function(response){
                    return response.data;
                });
        }

        function updateProfile(userId, user)
        {
            var url="/api/project/user";
            return $http.put(url, user)
                .then(function(response){
                    return response.data;
                });
        }

    }

})();