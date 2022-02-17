const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('../../middlewares/errorHandler');
const router = require('./routes');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  app.use(cors());
  next();
});

app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

module.exports = app;
