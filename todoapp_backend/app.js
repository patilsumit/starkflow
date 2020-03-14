let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let cors = require('cors');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());



//DB Config
const DB = require('./config/db_connection').MongoURI;

//Connect To Mongo
mongoose.connect(DB, {useNewUrlParser: true})
    .then(() => console.log('Database Connected...'))
    .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



var todoRouter = require('./routes/todos.route');
var userRouter = require('./routes/users.route');

app.use('/api', todoRouter.router);
app.use('/api', userRouter.router);

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
