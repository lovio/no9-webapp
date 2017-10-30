const express = require('express');
const pug = require('pug');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const favicon = require('serve-favicon');
const assign = require('lodash/assign');
// const cors = require('cors');
const config = require('./config.json');
const assets = require('./assets.json');

const injectedData = assign({}, config, { assets });

const PORT = process.env.PORT || config.port || 20000;

const app = new express();
const logger = console;

app.use(favicon(`${__dirname}/public/favicon.ico`));
app.use(morgan('combined'));
// app.use(cors());
app.use(helmet());
app.use(compression());

app.engine('pug', pug.__express);
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);
app.use(
  express.static(`${__dirname}/dist`, {
    maxAge: 31536000,
  })
);
app.use(helmet.noCache());

app.get(`/MP_verify_${config.WX_VERIFY_ID}.txt`, (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.attachment(`MP_verify_${config.WX_VERIFY_ID}.txt`);
  res.send(config.WX_VERIFY_ID);
});

// 默认开启服务端渲染
// if (!config.disableSSR) {
// const serverRenderMiddleware = require('./dist/serverRenderMiddleware.js');
//   app.use(serverRenderMiddleware);
// }

app.use((req, res) => {
  const inWechat = new RegExp('MicroMessenger', 'i').test(req.headers['user-agent']);
  // res.render('index', { inWechat, injectedData, serverRenderData: req.serverRenderData });
  res.render('index', { inWechat, injectedData });
});

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
