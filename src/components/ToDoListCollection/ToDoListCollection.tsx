import React, { useState } from 'react';
import './ToDoListCollection.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootStore';
import { addList } from '../../store/todolistsStore';
import { selectList } from '../../store/systemStore';
import TtTextbox from '../TtTextbox/TtTextbox';
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
      <Modal show={showCreateListDialog} onCancel={cancelCreateListDialog} onClose={closeCreateListDialog}>
        <CreateListForm />
      </Modal>
    </div>
  );
}

export default ToDoListCollection;
