import React, { useState } from 'react';
import './ToDoListCollection.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootStore';
import { selectList } from '../../store/systemStore';
import Modal from '../Modal/Modal';
import CreateListForm from '../CreateListForm/CreateListForm';

const ToDoListCollection: React.FC = () => {
  const todolists = useSelector((state: RootState) => state.todolists);
  const dispatch = useDispatch();
  const [showCreateListDialog, setShowCreateListDialog] = useState(false);

  const openCreateListDialog = () => {
    setShowCreateListDialog(true);
  }

  const cancelCreateListDialog = () => {
    setShowCreateListDialog(false);
  }

  const closeCreateListDialog = () => {
    setShowCreateListDialog(false);
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
      <button onClick={openCreateListDialog}>Create List</button>
      <Modal isOpen={showCreateListDialog} onEscapeKey={cancelCreateListDialog} onClickOutside={closeCreateListDialog}>
        <CreateListForm />
      </Modal>
    </div>
  );
}

export default ToDoListCollection;
