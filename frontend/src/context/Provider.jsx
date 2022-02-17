import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';
import { createTask, getTasks } from '../api';

export default function Provider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(async () => {
    const response = await getTasks();

    setTasks(response);
  }, [createTask]);

  const context = useMemo(() => ({
    tasks,
    createTask,
  }), [tasks]);

  return (
    <appContext.Provider value={context}>
      {children}
    </appContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
