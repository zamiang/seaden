let rewire = require('rewire');
let sinon = require('sinon');
let express = require('express');
let jade = require('jade');
let fs = require('fs');
let resolve = require('path').resolve;
let errorHandler = rewire('../routes');

beforeEach(function() {
  errorHandler.template = dirname + '/template.jade';
});

describe('#internalError', function() {

  it('renders a 500 page', function() {
    errorHandler.__set__('NODE_ENV', 'development');
    errorHandler.internalError(new Error("Some blah error"), {},
                               { statusCode: 500, send: spy = sinon.spy(), status: function(){} });
    spy.args[0][0].should.containEql("Some blah error");

  });

  it('sends a 500 by default', function() {
      errorHandler.internalError(new Error("Some blah error"), {},
                                 { statusCode: 500, send: spy = sinon.spy(), status: status = sinon.stub() });
      status.args[0][0].should.equal(500);
  });

  it('will look at the errors status', function() {
    err = new Error("Some blah error");
    err.status = 404;
    errorHandler.internalError(err, {},
                               { statusCode: 500, send: spy = sinon.spy(), status: status = sinon.stub() });
    status.args[0][0].should.equal(404);
  });
});

describe('#pageNotFound', function() {

  it('renders a 404 page', function() {
    // Fake a Express request object with Accept header set
    errorHandler.pageNotFound({}, {}, spy = sinon.spy());
    err = spy.args[0][0];
    err.status.should.equal(404);
    err.message.should.equal('Not Found');
  });
});
