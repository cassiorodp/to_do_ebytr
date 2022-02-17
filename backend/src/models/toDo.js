const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  const conn = await connect();

  const tasks = await conn.collection('to_do').find({}).toArray();

  return tasks;
};

const create = async ({ task, status, createdAt }) => {
  const conn = await connect();

  const { insertedId } = await conn.collection('to_do').insertOne({ task, status, createdAt });

  return insertedId;
};

const update = async ({ id, status }) => {
  const conn = await connect();

  await conn.collection('to_do').updateOne(
    { _id: ObjectId(id) },
    { $set: { status } },
  );
};

const deleteTask = async ({ id }) => {
  const conn = await connect();

  await conn.collection('to_do').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAll,
  create,
  update,
  deleteTask,
};
