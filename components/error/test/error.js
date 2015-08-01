let rewire = require('rewire');
let sinon = require('sinon');
let express = require('express');
let jade = require('jade');
let fs = require('fs');
let resolve = require('path').resolve;
let errorHandler = rewire('../routes');

beforeEach(function() {
  errorHandler.template = __dirname + '/template.jade';
});

describe('#internalError', function() {

  it('renders a 500 page', function() {
    let spy = sinon.spy();
    errorHandler.__set__('NODE_ENV', 'development');
    errorHandler.internalError(new Error("Some blah error"), {},
                               { statusCode: 500, send: spy, status: function(){} });
    spy.args[0][0].should.containEql("Some blah error");

  });

  it('sends a 500 by default', function() {
    let spy = sinon.spy();
    let status = sinon.stub();
    errorHandler.internalError(new Error("Some blah error"), {},
                               { statusCode: 500, send: spy, status: status });
    status.args[0][0].should.equal(500);
  });

  it('will look at the errors status', function() {
    let spy = sinon.spy();
    let status = sinon.stub();
    let err = new Error("Some blah error");
    err.status = 404;
    errorHandler.internalError(err, {},
                               { statusCode: 500, send: spy, status: status });
    status.args[0][0].should.equal(404);
  });
});

describe('#pageNotFound', function() {

  it('renders a 404 page', function() {
    // Fake a Express request object with Accept header set
    let spy = sinon.spy();
    errorHandler.pageNotFound({}, {}, spy);
    let err = spy.args[0][0];
    err.status.should.equal(404);
    err.message.should.equal('Not Found');
  });
});
