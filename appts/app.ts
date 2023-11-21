import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import ExpressSession from 'express-session';

let indexRouter = require('./routes/index');
let secretRouter = require('./routes/secret');
let loginRouter = require('./routes/login');

let app = express();

declare module 'express-session' {
  interface SessionOptions {
    login: boolean;
  }
}

const sess: ExpressSession.SessionOptions = {
  secret: 'secret',
  login: false,
  cookie: {
    maxAge: 1000 * 60 * 0.5,
  },
  resave: false,
  saveUninitialized: true,
}

app.use(ExpressSession(sess))

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/secret', secretRouter);
app.use('/login', loginRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
