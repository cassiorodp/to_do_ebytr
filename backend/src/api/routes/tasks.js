const express = require('express');
const {
  getAll, create, update, deleteTask,
} = require('../../controllers/tasks');

const taskRouter = express.Router();

taskRouter.get('/', getAll);
taskRouter.post('/', create);
taskRouter.put('/', update);
taskRouter.delete('/', deleteTask);

module.exports = taskRouter;
