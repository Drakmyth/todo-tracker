import React from 'react';
import './ToDoListCollection.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootStore';
import { addList } from '../../store/todolistsStore';
import { selectList } from '../../store/systemStore';

const ToDoListCollection: React.FC = () => {
  const todolists = useSelector((state: RootState) => state.todolists);
  const dispatch = useDispatch();

  const addList_click = () => {
    const list_id = Object.keys(todolists).length.toString();
    dispatch(addList(list_id))
  }

  return (
    <div className="ToDoListCollection">
      <button onClick={addList_click}></button>
      {Object.keys(todolists).map(key => {
        const renderData = todolists[key];
        return <div key={renderData.id} onClick={
          () => dispatch(selectList(renderData.id))
        }>{renderData.name}</div>
      })}
    </div>
  );
}

export default ToDoListCollection;
