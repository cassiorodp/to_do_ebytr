const connect = require('./connection');

const getAll = async () => {
  const conn = await connect();

  const tasks = await conn.collection('to_do').find({}).toArray();

  return tasks;
};

module.exports = {
  getAll,
};
