const Joi = require('joi');
const toDoModel = require('../models/toDo');
const { badRequest } = require('../utils/dictionary');
const errorConstructor = require('../utils/errorConstructor');

// validação das entradas
const toDoSchema = Joi.object({
  task: Joi.string().empty('').required(),
  status: Joi.string().empty('').required(),
  // createdAt: Joi.date().timestamp('javascript').required(),
});

const create = async ({ status, task, createdAt }) => {
  const { error } = toDoSchema.validate({
    status, task,
  });

  // validar entradas incorretas
  if (error) throw errorConstructor(badRequest, error.message);

  // inserir tarefa
  const taskId = await toDoModel.create({ task, status, createdAt });

  return {
    _id: taskId,
    status,
    task,
  };
};

const getAll = async () => {
  const tasks = await toDoModel.getAll();

  return tasks;
};

const update = async ({ id, status }) => {
  await toDoModel.update({ id, status });
};

const deleteTask = async ({ id }) => {
  await toDoModel.deleteTask({ id });
};

module.exports = {
  create,
  getAll,
  update,
  deleteTask,
};
