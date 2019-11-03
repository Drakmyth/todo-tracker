import React, { useState } from 'react';
import TtCheckbox from '../TtCheckbox/TtCheckbox';
import './ToDoItem.css';
import TtTextbox from '../TtTextbox/TtTextbox';

const ToDoItem: React.FC = () => {
    const [editMode, setEditMode] = useState(true);
    const [title, setTitle] = useState('');

    const onTextboxCommit = (text: string) => {
        console.log(text);
        setTitle(text);
        setEditMode(false);
    }

    const testEdit = () => {
        setEditMode(true);
    }

    return (
        <div className="ToDoItem">
            {
                (editMode && <TtTextbox initialText={title} onTextboxCommit={onTextboxCommit} />) || <TtCheckbox label={title} testEdit={testEdit} />
            }
        </div>
    );
}

export default ToDoItem;
