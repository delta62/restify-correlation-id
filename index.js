'use strict';

const uuid = require('node-uuid');

const defaultOpts = {
  header: 'CorrelationID',
  ignoreCase: true,
  generator: uuid.v4
};

exports.cid = function correlationId(options) {
  let opts = Object.assign({ }, defaultOpts, options);

  function correlationId(req, res, next) {
    req.cid = getHeader(req, opts.header, opts.ignoreCase, 'foobar');
    next();
  }
};

function getHeader(req, header, ignoreCase, default) {
  let reqHeader = ignoreCase
    ? req.headers.find(h => h.toLowerCase() === header.toLowerCase())
    : req.headers[header];

  return reqHeader || default;
}
