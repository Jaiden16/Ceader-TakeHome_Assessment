var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var doctorsRouter = require('./routes/doctors');
var appointmentsRouter = require('./routes/appointments');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',doctorsRouter);
app.use('/',appointmentsRouter);


module.exports = app;
