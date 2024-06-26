var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var apiRouter = require('./routes/api');
var accidentRouter = require('./routes/accident');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session Initialize
app.use(session({
  secret: "ed4beb38b45860afbee133162b4c86fc",
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 60000 * 60 * 3 } // 3 hours until expires
}));

// Database Variables
const mongoose = require( 'mongoose' ),
      url = `mongodb://127.0.0.1:27017/mongoProject`;

// Database Connection
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/', loginRouter);
app.use('/search', searchRouter);
app.use('/accident', accidentRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
