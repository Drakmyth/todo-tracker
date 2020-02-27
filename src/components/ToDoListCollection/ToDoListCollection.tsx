import React, { useState } from 'react';
import './ToDoListCollection.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootStore';
import { selectList } from '../../store/systemStore';
import AddListModal from './AddListModal/AddListModal';
import { addList } from '../../store/todolistsStore';
import { addReason } from '../../store/skipreasonsStore';

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

  const confirmCreateListDialog = (title: string, complete_color: string, incomplete_color: string, skipReasons: ReasonColorMap) => {
    const retVal = dispatch(addList(title, complete_color, incomplete_color));
    Object.keys(skipReasons).forEach((reason) => {
      const retVal2 = dispatch(addReason(retVal.id, reason, skipReasons[reason]));
      console.log(retVal2);
    })
    console.log(retVal);
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
      <AddListModal isOpen={showCreateListDialog} onCancel={cancelCreateListDialog} onConfirm={confirmCreateListDialog}/>
    </div>
  );
}

export default ToDoListCollection;
