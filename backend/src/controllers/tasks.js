const toDoService = require('../services/toDo');
const { success } = require('../utils/dictionary');

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

module.exports = {
  getAll,
};
