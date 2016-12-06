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
