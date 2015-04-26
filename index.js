var express = require("express");
var app = express();
var articles = require("./models/Articles")();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');

app.set('views', __dirname + "/views");
app.set('view engine', 'jade');
app.use(bodyParser());
app.set("username", "admin");
app.set("password", "pass");
app.use(cookieParser('blog-application'));
app.use(session());
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    req.articles = articles;
    next();
});

app.use(logger());

app.use(function(req, res, next) {
    if((
        req.session && 
        req.session.admin === true
    ) || (
        req.body &&
        req.body.username === app.get("username") &&
        req.body.password === app.get("password")
    )) {
        req.logged = true;
        req.session.admin = true;
    };
    next();
});


var protect = function(req, res, next) {
	if(req.logged) {
		next();
	}else{
		res.send(401, 'No Access.');
	}
}
app.get('/contact', require('./controllers/contact'));
app.get('/about', require('./controllers/about'));
app.get('/api/get', require("./controllers/api/get"));
app.post('/api/add', protect, require("./controllers/api/add"));
app.post('/api/edit', protect, require("./controllers/api/edit"));
app.post('/api/delete', protect, require("./controllers/api/delete"));
app.all('/admin', require("./controllers/admin"));
app.get('/', require("./controllers/index"));

app.listen(80, function(){
	process.setuid('www-data');
});
console.log("Listening on port 80");
