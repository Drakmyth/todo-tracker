import React, { useState } from 'react';
import './ToDoListCollection.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootStore';
import { addList } from '../../store/todolistsStore';
import { selectList } from '../../store/systemStore';
import TtTextbox from '../TtTextbox/TtTextbox';

const ToDoListCollection: React.FC = () => {
  const todolists = useSelector((state: RootState) => state.todolists);
  const dispatch = useDispatch();
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const displayPlaceholder = () => {
    setShowPlaceholder(true);
  }

  const onTextboxCommit = (text: string) => {
    setShowPlaceholder(false);
    if (text === '') {
      return;
    }
    console.log(`Creating list ${text}`)
    dispatch(addList(text))
  }

  return (
    <div className="ToDoListCollection">
      <header>Lists</header>
      {
        Object.keys(todolists).map(key => {
          const renderData = todolists[key];
          return (
            <div key={renderData.id}
              onClick={() => dispatch(selectList(renderData.id))}>{renderData.name}</div>
          )
        })
      }
      {showPlaceholder && <TtTextbox initialText="" onTextboxCommit={onTextboxCommit} />}
      <button onClick={displayPlaceholder} disabled={showPlaceholder}>Create List</button>
    </div>
  );
}

export default ToDoListCollection;
