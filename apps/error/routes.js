let _ = require('underscore');
let fs = require('fs');
let jade = require('jade');
let NODE_ENV = process.env.NODE_ENV;

let render = function(res, data) {
  res.send(
    jade.compile(fs.readFileSync(this.template), { filename: this.template })(data)
  );
};

this.pageNotFound((req, res, next) => {
  err = new Error();
  err.status = 404;
  err.message = 'Not Found';
  next(err);
});

this.internalError((err, req, res, next) => {
  console.warn(err.stack);
  res.status(err.status || 500);
  let detail = (err.message || err.text || err.toString());
  render(res, _.extend({
    code: res.statusCode,
    error: err,
    detail: detail
  }, res.locals));
});
