var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var compression = require('compression');
var cors = require('cors');
var createError = require('http-errors');


var attributeRouter = require('./routes/attribute');
var queryRouter = require('./routes/query');
var testRouter = require('./routes/test');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(cors());

app.use('/attribute', attributeRouter);
app.use('/query', queryRouter);
app.use('/', testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    code: err.code,
    message: err.message,
    stack: err.stack,
  })
});

module.exports = app;
