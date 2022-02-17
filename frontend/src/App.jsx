import React, { useContext } from 'react';
import './App.css';
import Form from './components/Form';
import appContext from './context/appContext';

function App() {
  const { tasks } = useContext(appContext);
  return (
    <div className="App">
      <h1>Ebytr Lista de Tarefas</h1>
      <Form />
      {tasks.length !== 0 && tasks.map(({ task, status }) => (
        <div key={task}>{`${task} / ${status}`}</div>
      ))}
    </div>
  );
}

export default App;
