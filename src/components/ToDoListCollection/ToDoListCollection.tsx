import React from 'react';
import './ToDoListCollection.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, addList } from '../../store';

/*
const ToDoListCollection: React.FC = () => {
    const [listItems, setListItems] = useState([] as string[]);
    const [showPlaceholder, setShowPlaceholder] = useState(false);

    const addItem = () => {
        setShowPlaceholder(true);
    }

    const onTextboxCommit = (text: string) => {
        setShowPlaceholder(false);
        if (text === '') {
            return;
        }
        console.log(`Adding item ${text}`)
        listItems.push(text);
        setListItems(listItems.slice(0));
    }



    return (
        <div className="ToDoListCollection">
            {listItems.map((i, idx) => <ToDoList key={idx} title={i}/>)}
            {showPlaceholder && <TtTextbox initialText="" onTextboxCommit={onTextboxCommit} />}
            <button onClick={addItem}><span>Add List</span></button>
        </div>
    );
*/

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
