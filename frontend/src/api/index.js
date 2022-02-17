import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const getTasks = async () => {
  const tasks = await axios(`${BASE_URL}/tasks`);

  return tasks.data;
};

export const createTask = async ({ status, task, createdAt }) => {
  const createdTask = await axios({
    method: 'post',
    url: `${BASE_URL}/tasks`,
    data: {
      status,
      task,
      createdAt,
    },
  });

  return createdTask;
};
