const Joi = require('joi');
const toDoModel = require('../models/toDo');
const { badRequest } = require('../utils/dictionary');
const errorConstructor = require('../utils/errorConstructor');

// validação das entradas
const toDoSchema = Joi.object({
  task: Joi.string().empty('').required(),
  status: Joi.string().empty('').required(),
});

const create = async ({ status, task }) => {
  const { error } = toDoSchema.validate({
    status, task,
  });

  // validar entradas incorretas
  if (error) throw errorConstructor(badRequest, error.message);

  // inserir tarefa
  const taskId = await toDoModel.create({ task, status });

  return {
    _id: taskId,
    status,
    task,
  };
};

module.exports = {
  create,
};
