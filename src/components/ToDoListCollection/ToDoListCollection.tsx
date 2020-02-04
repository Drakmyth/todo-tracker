import React, { useState } from 'react';
import './ToDoListCollection.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootStore';
import { addList } from '../../store/todolistsStore';
import { selectList } from '../../store/systemStore';
import TtTextbox from '../TtTextbox/TtTextbox';
import Modal from '../Modal/Modal';

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

  const modalProps = {
    triggerText: 'This is a button to trigger the Modal',
    ariaLabel: "A label describing the Modal's current content"
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
      <Modal {...modalProps}>Testing Content</Modal>
    </div>
  );
}

export default ToDoListCollection;
