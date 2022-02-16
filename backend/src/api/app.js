const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('../../middlewares/errorHandler');
const router = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

module.exports = app;
