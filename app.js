var express = require("express");
var path = require("path");
var debug = require("debug");

var routes = require("./routes/index");
var grid = require("./routes/grid");
var bubbles = require("./routes/bubbles")
var bubblesSVG = require("./routes/bubblesSVG")

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes)
app.use("/grid", grid)
app.use("/bubbles", bubbles)
app.use("/bubblesSVG", bubblesSVG)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
