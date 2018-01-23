var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var seed = require('./server/routes/seed');
var users = require('./server/routes/users');

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

module.exports = app;