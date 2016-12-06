[![Build Status](https://travis-ci.org/delta62/restify-correlation-id.svg?branch=master)](https://travis-ci.org/delta62/restify-correlation-id)
[![npm version](https://badge.fury.io/js/restify-correlation-id.svg)](https://badge.fury.io/js/restify-correlation-id)

# restify-correlation-id
A restify plugin to track correlation IDs across API requests

Correlation IDs (sometimes called "trace IDs") are unique identifiers that
track a request through a series of API calls.

This middleware parses incoming headers for a set correlation ID and stores it
away on the `req` object. If no appropriate headers are sent with the request,
a new ID is created instead.

## Usage

``` js
const restify = require('restify'),
  { cid } = require('restify-correlation-id');

let server = restify.createServer();
server.use(correlationId());

server.get('/', (req, res, next) => {
  res.send(req.cid);
  next();
});

server.listen(8080, () => {
  console.log('I echo correlation IDs!');
});
```

### Option

``` js
{
  header: 'CorrelationID'
}
```

#### header

The name of the header to parse a correlation ID from. Parsing is
case-insensitive. The default header field is "CorrelationID".

## License
MIT
