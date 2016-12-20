var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var database = require('./config/database.js');
var path = require('path');

mongoose.connect(database.url); // connect to db

// require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({ secret: 'a;sldkfasdi283423a;sl134' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Running on port ' + port);
