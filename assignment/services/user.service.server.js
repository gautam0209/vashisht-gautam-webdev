var app = require('../../express');


var users =             [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

app.post('/api/assignment/graduate/user', createUser);
app.get('/api/assignment/graduate/user', findAllUsers);

app.get('/api/assignment/graduate/user/:userId', findUserById);
app.put('/api/assignment/graduate/user/:userId', updateUser);
app.delete('/api/assignment/graduate/user/:userId', deleteUser);


function deleteUser(req, res) {
    var userId = req.params['userId'];
    for (var u in users) {
        if (users[u]._id === userId) {
            users.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}


function updateUser(req, res)
{
    var user = req.body;

    for(var u in users)
    {
        var tempUser = users[u];

        if(tempUser._id === user._id)
        {
            users[u].username = user.username;
            users[u].firstName = user.firstName;
            users[u].lastName = user.lastName;
            res.sendStatus(200);
            return;
        }

    }
    res.sendStatus(404);
}
function findUserById(req, res)
{
    var userId = req.params['userId'];
    for(var u in users) {
        if (users[u]._id === userId){
            res.send(users[u]);
            return;
    }
    }
    res.sendStatus(404);

}

function findUserByCredential(req,res){
    var username = req.query['username'];
    var password = req.query['password'];

    for(var v in users)
    {
        var user = users[v];
        if(user.username === username && user.password === password)
        {
            res.json(user);
            return;
        }

    }

    res.sendStatus(404);

}

function findUserByUsername(req, res)
{
    var username = req.query['username'];


    for(var v in users)
    {
        var user = users[v];
        if(user.username === username)
        {
            res.json(user);
            return;
        }

    }

    res.sendStatus(404);
}

function findAllUsers(req, res){
    var username = req.query['username'];
    var password = req.query['password'];

    if(username && password)
    {
            findUserByCredential(req,res);
    }
    else if(username)
    {
            findUserByUsername(req, res);
    }
    else
        res.send(users);
}

function createUser(req, res){
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.json(user);
}