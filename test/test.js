'use strict';

const correlationId            = require('../lib/index'),
  { beforeEach, describe, it } = require('mocha'),
  expect                       = require('code').expect;

describe('Correlation ID middleware', () => {
  let callCount = 0;
  let next;
  let req;

  beforeEach(() => {
    next = () => callCount++;
    req = {
      headers: { },
      id: () => 'default'
    };
  });

  it('should call next()', () => {
    callMiddleware(req, next);
    expect(callCount).to.equal(1);
  });

  it('should default the correlation ID to the request ID', () => {
    callMiddleware(req, next);
    expect(req.cid).to.equal('default');
  });

  describe('header field', () => {
    it('should default to CorrelationID', () => {
      req.headers = { CorrelationID: 'foobar' };
      callMiddleware(req, next);
      expect(req.cid).to.equal('foobar');
    });

    it('should allow specification of a custom header field', () => {
      req.headers = { Cheese: 'foobar' };
      callMiddleware(req, next, { header: 'Cheese' });
      expect(req.cid).to.equal('foobar');
    });
  });

  describe('case sensitivity', () => {
    it('should match headers with matching case', () => {
      req.headers = { CorrelationID: 'foobar' };
      callMiddleware(req, next);
      expect(req.cid).to.equal('foobar');
    });

    it('should match headers with different cases', () => {
      req.headers = { cOrrElAtIOnId: 'foobar' };
      callMiddleware(req, next);
      expect(req.cid).to.equal('foobar');
    });
  });
});

function callMiddleware(req, next, opts) {
  correlationId.cid(opts)(req, null, next);
}
