[![Build Status](https://travis-ci.org/delta62/restify-correlation-id.svg?branch=master)](https://travis-ci.org/delta62/restify-correlation-id)
[![npm version](https://badge.fury.io/js/restify-correlation-id.svg)](https://badge.fury.io/js/restify-correlation-id)

# restify-correlation-id
A restify plugin to track correlation IDs across API requests

## Usage

``` js
const correlationId = require('restify-correlation-id').cid,
  restify = require('restify');

let server = restify.createServer();
server.use(correlationId(opts));
```

### Option

``` js
{
  header: 'CorrelationID'
}
```

#### header

The name of the header to parse a correlation ID from. Parsing is
case-insensitive.

## License
MIT
