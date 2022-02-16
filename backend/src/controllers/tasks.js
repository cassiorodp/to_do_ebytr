const toDoService = require('../services/toDo');
const { success, created } = require('../utils/dictionary');

const getAll = async (req, res, next) => {
  try {
    const tasks = await toDoService.getAll();

    return res.status(success).json(tasks);
  } catch (error) {
    console.error(`Get All -> ${error.message}`);
    next(error);
    return null;
  }
};

const create = async (req, res, next) => {
  try {
    const task = await toDoService.create(req.body);

    return res.status(created).json(task);
  } catch (error) {
    console.error(`Create -> ${error.message}`);
    next(error);
    return null;
  }
};

const update = async (req, res, next) => {
  try {
    await toDoService.update(req.body);

    return res.status(success).json({ message: 'Task updated' });
  } catch (error) {
    console.error(`Update -> ${error.message}`);
    next(error);
    return null;
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await toDoService.deleteTask(req.body);

    return res.status(success).json({ message: 'Task deleted' });
  } catch (error) {
    console.error(`Delete -> ${error.message}`);
    next(error);
    return null;
  }
};

module.exports = {
  getAll,
  create,
  update,
  deleteTask,
};
