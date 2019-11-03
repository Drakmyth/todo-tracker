import React, { useState } from 'react';
import './ToDoList.css';
import TtCheckbox from '../TtCheckbox/TtCheckbox';

const ToDoList: React.FC = () => {
    const [listItems, setListItems] = useState(['Test1', 'Test2', 'Test3']);

    const addItem = () => {
        const newItemId = listItems.length + 1;
        console.log(`Adding item ${newItemId}`)
        listItems.push(`Test${newItemId}`);
        setListItems(listItems.slice(0));
    }

    return (
        <div className="ToDoList">
            {listItems.map((i, idx) => <TtCheckbox key={idx} label={i}></TtCheckbox>)}
            <button onClick={addItem}><span>Add Item</span></button>
        </div>
    );
}

export default ToDoList;
