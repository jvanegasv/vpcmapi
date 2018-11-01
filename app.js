var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ioJwtAuth = require('socketio-jwt-auth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passing soket.io to the response - middleware
app.use(function(req, res, next){
  res.io = io;
  next();
});
// middleware para validar soket.io con token
io.use(ioJwtAuth.authenticate({
  secret: '#H3g0y465',    // required, used to verify the token's signature
  algorithm: 'HS256',        // optional, default to be HS256
  succeedWithoutToken: false
}, function(payload, done) {

  // IF TOKEN IS OK (payload) THEN 
  // YOU CAN MAKE MORE VALIDATIONS
  // AND FINNALY RETURN AND ERROR OR SUCCESS

  // return ERROR:
  // return done(err);

  // return success with data
  return done(null,payload);

}));

io.on('connection', function(socket) {
  console.log('Alguien se conecto with data:' , socket.request.user);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = {app: app, server: server};
