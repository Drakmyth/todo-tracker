import React from 'react';
import './ToDoListCollection.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, addList } from '../../store';

const ToDoListCollection: React.FC = () => {
  const todolists = useSelector((state: RootState) => state.todolists);
  const dispatch = useDispatch();

  return (
    <div className="ToDoListCollection">
      <button onClick={
          () => dispatch(addList({id: Object.keys(todolists).length.toString(), name: Object.keys(todolists).length.toString()}))
        }></button>
      {Object.keys(todolists).map(key => {
        const renderData = todolists[key];
        return <div key={renderData.id}>{renderData.id}</div>
      })}
    </div>
  );
}

export default ToDoListCollection;
