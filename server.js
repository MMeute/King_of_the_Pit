var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var seed = require('./routes/seed');

var app = express();
app.use(compression());

// load env variables
require('dotenv').load()


// connect to Mongo DB with mongoose
require('./config/database')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/seed', seed);

module.exports = app;