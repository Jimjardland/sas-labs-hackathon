// mongodb://heroku_s8hwsr63:337r14tmt5b1t153v0igm4q01g@ds223063.mlab.com:23063/heroku_s8hwsr63
const compression = require('compression');
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const handler = routes.getRequestHandler(nextApp);
const { logError } = require('./lib/logger');

const mongodbUrl =
  process.env.MONGODB_URI ||
  'mongodb://heroku_s8hwsr63:337r14tmt5b1t153v0igm4q01g@ds223063.mlab.com:23063/heroku_s8hwsr63';
mongoose.connect(
  mongodbUrl,
  { useNewUrlParser: true }
);

nextApp.prepare().then(() => {
  // express code here
  const app = express();
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(handler);

  app.get('*', (req, res) => handle(req, res));
  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`);
  });
});

process.on('uncaughtException', err => {
  logError(`Caught exeption: ${err}, stack: ${err.stack}`);
});

process.on('unhandledRejection', err => {
  logError(`unhandledRejection: ${err}, stack: ${err.stack}`);
});
