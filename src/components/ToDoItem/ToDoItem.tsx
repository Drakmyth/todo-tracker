import React, { useState } from 'react';
import TtCheckbox from '../TtCheckbox/TtCheckbox';
import './ToDoItem.css';
import TtTextbox from '../TtTextbox/TtTextbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    if (editMode) {
        return (
            <div className="ToDoItem">
                <TtTextbox initialText={title} onTextboxCommit={onTextboxCommit} />
            </div>
        )
    }
    else {
        return (
            <div className="ToDoItem">
                <TtCheckbox label={title} />
                <FontAwesomeIcon icon="pen" onClick={testEdit}></FontAwesomeIcon>
            </div>
        )
    }
}

export default ToDoItem;
