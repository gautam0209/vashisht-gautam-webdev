var app = require('./express');
var bodyParser = require('body-parser');

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());
app.use(session({secret:"put some text here"}));
//app.use(session({secret: process.env.SESSION_SECRET}));

app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');
require('./utilities/filelist');


app.use(app.express.static(__dirname + '/public'));

require('./lectures/graduate/session/app');

var blog = require('./lectures/graduate/blog/app');
blog(app);

var todo = require('./lectures/undergraduate/todo/app');
todo(app);

require('./test/app')(app) ;
require('./assignment/app');

app.listen(process.env.PORT || 3000);