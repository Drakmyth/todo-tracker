import React, { useState } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import './ToDoList.css';

const ToDoList: React.FC = () => {
    const [listItems, setListItems] = useState([] as string[]);

    const addItem = () => {
        const newItemId = listItems.length + 1;
        console.log(`Adding item ${newItemId}`)
        listItems.push(`Test${newItemId}`);
        setListItems(listItems.slice(0));
    }

    return (
        <div className="ToDoList">
            {listItems.map((i, idx) => <ToDoItem key={idx} />)}
            <button onClick={addItem}><span>Add Item</span></button>
        </div>
    );
}

export default ToDoList;
