'use strict';

const defaultOpts = {
  header: 'CorrelationID',
  ignoreCase: true
};

exports.cid = function correlationId(options) {
  let opts = Object.assign({ }, defaultOpts, options);

  return function correlationId(req, res, next) {
    req.cid = getHeader(req, opts.header, opts.ignoreCase, 'foobar');
    next();
  };
};

function getHeader(req, header, ignoreCase) {
  let reqHeader = ignoreCase
    ? req.headers.find(h => h.toLowerCase() === header.toLowerCase())
    : req.headers[header];

  return reqHeader || req.id;
}
