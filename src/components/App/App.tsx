import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoListCollection from '../ToDoListCollection/ToDoListCollection';

const App: React.FC = () => {
  return (
    <div className="App">
      <ToDoListCollection></ToDoListCollection>
    </div>
  );
}

export default App;
