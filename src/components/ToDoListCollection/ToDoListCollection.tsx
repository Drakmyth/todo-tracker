import React, { useState } from 'react';
import ToDoList from '../ToDoList/ToDoList';
import TtTextbox from '../TtTextbox/TtTextbox';
import './ToDoListCollection.css';

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
}

export default ToDoListCollection;
