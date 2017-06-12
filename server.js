var app = require('./express');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
require('./utilities/filelist');


app.use(app.express.static(__dirname + '/public'));

var blog = require('./lectures/graduate/blog/app');
blog(app);

var todo = require('./lectures/undergraduate/todo/app');
todo(app);

require('./test/app')(app);
require('./assignment/app')(app);

app.listen(process.env.PORT || 3000);