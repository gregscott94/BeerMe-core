// Main file to start server
// Author - Greg Scott

var express = require('express'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    config,
    aws = require('aws-sdk'),
    app = express();

if (process.NODE_ENV == 'qa') {
  config = require('./config/qa');
} else {
  config = require('./config/dev');
}

aws.config.update({
  region: config.aws.region,
  endpoint: config.aws.endpoint
});

app.use(helmet());
app.use(bodyParser());

require('./routes/general')(app, config, aws);
require('./routes/fb')(app, config, aws);
require('./routes/dw')(app, config, aws);

app.listen(config.port, (err) => {
  if (err) {
    return console.log('Error on server start: ', err)
  }

  console.log(`Server is listening on ${port}`)
})
