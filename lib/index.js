'use strict';

const defaultOpts = {
  header: 'CorrelationID'
};

exports.cid = function correlationId(options) {
  let opts = Object.assign({ }, defaultOpts, options);

  return function correlationId(req, res, next) {
    req.cid = getHeader(req, opts.header, req.id);
    next();
  };
};

function getHeader(req, header, def) {
  let headers = Object.keys(req.headers);
  let reqHeader = headers.find(h => h.toLowerCase() === header.toLowerCase());
  return reqHeader && req.headers[reqHeader] || def;
}
