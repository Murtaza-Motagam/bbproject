var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// var indexRouter = require('./routes/users');
// var usersRouter = require('./routes/users');
const connectToMongo = require('./database');

var app = express();

// Database Declaration

connectToMongo();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' // or an array of allowed origins
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/admin', require('./routes/adminUser'));
app.use('/api/auth', require('./routes/users'));
app.use('/api/user', require('./routes/user'));
app.use('/api/blogs', require('./routes/blogs'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// confirming server is running or not

app.get('/', (req, res)=>{
  res.send("Server is successfully running on port 4000")
})

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
