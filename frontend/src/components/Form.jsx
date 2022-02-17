import React, { useContext, useState } from 'react';
import appContext from '../context/appContext';

export default function Form() {
  const [inputTask, setInputTask] = useState('');
  const [selectTask, setSelectedTask] = useState('pendente');
  const { createTask } = useContext(appContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdAt = new Date();
    createTask({ status: selectTask, task: inputTask, createdAt });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputTask} onChange={(e) => setInputTask(e.target.value)} />
      <label htmlFor="status">
        Status da tarefa
        <select value={selectTask} onChange={(e) => setSelectedTask(e.target.value)} name="status" id="status">
          <option value="pendente">pendente</option>
          <option value="em andamento">em andamento</option>
          <option value="pronto">pronto</option>
        </select>
      </label>
      <button type="submit">Criar Tarefa!</button>
    </form>
  );
}
