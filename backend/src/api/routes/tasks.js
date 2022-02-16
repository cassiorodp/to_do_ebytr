const express = require('express');
const { getAll } = require('../../controllers/tasks');

const taskRouter = express.Router();

taskRouter.get('/', getAll);

module.exports = taskRouter;
