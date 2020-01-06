import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ToDoListCollection from '../ToDoListCollection/ToDoListCollection';

library.add(fab, far, fas);

const App: React.FC = () => {
  return (
    <div className="App">
      <ToDoListCollection/>
    </div>
  );
}

export default App;
