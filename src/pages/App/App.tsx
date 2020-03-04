import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ToDoListCollection from '../../components/ToDoListCollection/ToDoListCollection';
import ToDoList from '../../components/ToDoList/ToDoList';
import { RootState } from '../../store/rootStore';
import { useSelector } from 'react-redux';

library.add(fab, far, fas);

const App: React.FC = () => {
  const system = useSelector((state: RootState) => state.system);

  return (
    <main className="app-page">
      <ToDoListCollection/>
      <ToDoList id={system.selectedList}/>
      <div className="calendar" />
      <div className="history" />
    </main>
  );
}

export default App;
