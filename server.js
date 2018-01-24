var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var debug = require('debug');

var seed = require('./server/routes/seed');
var users = require('./server/routes/users');
// var upcomingShows = require('./server/routes/upcomingShows');
// var pastShows = require('./server/routes/pastShows');

var app = express();
app.use(compression());

// load env variables
require('dotenv').load()

// connect to Mongo DB with mongoose
require('./server/config/database')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

app.use('/api/seed', seed);
app.use('/api/users', users);
// app.use('/api/user/upcomingShows', upcomingShows);
// app.use('/api/user/pastShows', pastShows);

module.exports = app;