let config = require("../config.js");
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let sharify = require("sharify");

// Setup sharify constants & require dependencies that use sharify data
sharify.data = {
  JS_EXT: (("production" == config.NODE_ENV || "staging" == config.NODE_ENV) ? ".min.js.cgz" : ".js"),
  CSS_EXT: (("production" == config.NODE_ENV || "staging" == config.NODE_ENV) ? ".min.css.cgz" : ".css"),
  ASSET_PATH: config.ASSET_PATH,
  APP_URL: config.APP_URL,
  API_URL: config.API_URL,
  NODE_ENV: config.NODE_ENV
};

module.exports = function(app) {

  let app = express();

  // Development only middlewares that compile assets
  if ("development" == config.NODE_ENV) {
    app.use(require("stylus").middleware({
      src: path.resolve(__dirname, "../"),
      dest: path.resolve(__dirname, "../public")
    }));

    // TODO: Investigate need for browserify-dev-middleware
    app.use(require("browserify-dev-middleware")({
      src: path.resolve(__dirname, "../"),
      transforms: [require("jadeify")]
    }));
  } else if ("test" == config.NODE_ENV) {
    // TODO - Middleware to allow back door to log in for tests.
    // Stub database
    // create user
  }

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(bodyParser.json());

  // TODO: Investigate extended
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Require the actual apps here
  app.use(require("../apps/posts"));
  // app.use(require("../apps/admin"));


  // Static files
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  fs.readdirSync(path.resolve(__dirname, '../apps').forEach(function(fld) {
    app.use(express.static(path.resolve(__dirname, "../apps/#{fld}/public")));
  }));
  fs.readdirSync(path.resolve(__dirname, '../components').forEach(function(fld) {
    app.use(express.static(path.resolve(__dirname, "../components/#{fld}/public")));
  }));
  app.use(express.static(path.join(__dirname, 'public')));


  // Route to ping for system up
  app.get('/system/up', function(req, res) {
    res.send(200, { nodejs: true });
  });

  // Finally 404 and error handling middleware
  require('../components/error')(app, {
    template: path.resolve(__dirname, '../components/main_layout/templates/error.jade'),
    showDetail: config.NODE_ENV == 'production' ? false : true
  });

};
