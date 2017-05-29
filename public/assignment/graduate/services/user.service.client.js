/**
 * Created by Gautam Vashisht on 5/27/2017.
 */

(function (){
    angular
        .module('WebAppMaker')
        .factory('userService',userService);

    function userService()
    {
        var users =             [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

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
            user._id = (new Date()).getTime() + "";
            user.created = new Date();
            users.push(user);

            return user;
        }

        function findUserByUserName(userName) {
            for(var v in users)
            {
                var user = users[v];
                if(user.username === userName)
                    return user;
            }

            return null;
        }

        function findUserById(userId)
        {
            for(var v in users)
            {
                var user = users[v];
                if(user._id === userId)
                    return user;
            }

            return null;
        }

        function findUserByCredential(username, password)
        {
            for(var v in users)
            {
                var user = users[v];
                if(user.username === username && user.password === password)
                    return user;
            }

            return null;
        }

        function deleteUser(userId){
            var user = findUserById(userId);
            var index = users.indexOf(user);
            users.splice(index,1);
            }

        function updateUser(userId, user)
        {
            for(var u in users)
            {
                var tempUser = users[u];
                if(tempUser._id === userId)
                {
                    users[u].username = user.username;
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                }

            }
        }


    }

})();