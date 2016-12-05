'use strict';

const correlationId            = require('./index'),
  { beforeEach, describe, it } = require('mocha'),
  expect                       = require('code').expect;

describe('Correlation ID middleware', () => {
  let callCount = 0;
  let next;
  let req;

  beforeEach(() => {
    next = () => callCount++;
    req = {
      headers: { }
    };
  });

  it('should call next', () => {
    callMiddleware(req, next);
    expect(callCount).to.equal(1);
  });

  describe('header field', () => {
    it('should default to CorrelationID', () => {
      req.headers = { CorrelationID: 'foobar' };
      callMiddleware(req, next);
      expect(req.id).to.equal('foobar');
    });

    it('should allow specification of a custom header field', () => {
      req.headers = { Cheese: 'foobar' };
      callMiddleware(req, next, { header: 'Cheese' });
      expect(req.id).to.equal('foobar');
    });
  });

  describe('case sensitivity', () => {
    it('should match headers with matching case', () => {
      req.headers = { CorrelationId: 'STOP YELLING IN THE HOUSE' };
      callMiddleware(req, next);
      expect(req.id).to.equal('STOP YELLING IN THE HOUSE');
    });

    it('should match headers with different cases', () => {
      req.headers = { CorrelationID: 'h4x' };
      callMiddleware(req, next);
      expect(req.id).to.equal('h4x');
    });
  });
});

function callMiddleware(req, next, opts) {
  correlationId.cid(opts)(req, null, next);
}
