"use strict";

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    app = express(),
    jade = require('jade');



var server_port =  3000;
var server_ip_address =  '127.0.0.1';


// setting routes
var routes = require('./routes');

// setup view engine
app.set('views', path.join(__dirname, 'views'));
//jade.pretty(true);
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(require('stylus').middleware(path.join(__dirname, 'bower_components')));
app.use("/public", express.static(path.join(__dirname, 'bower_components')));
//app.use(require('stylus').middleware(path.join(__dirname, 'custom_ui')));
app.use("/custom-ui", express.static(path.join(__dirname, 'customui')));

app.use(cookieParser('secret'));

app.use(session({
   //cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
    secret: "reptile"
}));

app.use(function (err, req, res, next) {
        "use strict";
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
});

//app.use(flash);

routes(app);
//app.get('/', function (req, res) {
//  console.log("getting"); // /admin
//  res.send('Admin Homepage');
//})

var server = app.listen(server_port, server_ip_address,  function () {
    console.log("Listening on " + server_ip_address + ", server_port " + server_port);
});

