// mongodb://heroku_s8hwsr63:337r14tmt5b1t153v0igm4q01g@ds223063.mlab.com:23063/heroku_s8hwsr63
const compression = require('compression');
const express = require('express');
const next = require('next');
const path = require('path');

const bodyParser = require('body-parser');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const handler = routes.getRequestHandler(nextApp);

nextApp.prepare().then(() => {
  // express code here
  const app = express();
  app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

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
  console.error(`Caught exeption: ${err}, stack: ${err.stack}`);
});

process.on('unhandledRejection', err => {
  console.error(`unhandledRejection: ${err}, stack: ${err.stack}`);
});
