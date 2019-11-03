import React, { useState } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import './ToDoList.css';
import TtTextbox from '../TtTextbox/TtTextbox';

const ToDoList: React.FC = () => {
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
        <div className="ToDoList">
            {listItems.map((i, idx) => <ToDoItem key={idx} initialTitle={i}/>)}
            {showPlaceholder && <TtTextbox initialText="" onTextboxCommit={onTextboxCommit} />}
            <button onClick={addItem}><span>Add Item</span></button>
        </div>
    );
}

export default ToDoList;
