const connect = require('./connection');

const getAll = async () => {
  const conn = await connect();

  const tasks = await conn.collection('to_do').find({}).toArray();

  return tasks;
};

const create = async ({ task, status }) => {
  const conn = await connect();

  const { insertedId } = await conn.collection('to_do').insertOne({ task, status });

  return insertedId;
};

module.exports = {
  getAll,
  create,
};
