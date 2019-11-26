var express = require('express');
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var itemsRouter = require('./routes/items');

var app = express();

mongoose
  .connect(
    //'mongodb+srv://admin:admin@cluster0-xioye.mongodb.net/todo?retryWrites=true&w=majority',
    'mongodb://localhost:27017/todo',
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build/')));

app.use('/api/items', itemsRouter);

module.exports = app;
