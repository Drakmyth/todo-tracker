import React, { useState } from 'react';
import TtCheckbox from '../TtCheckbox/TtCheckbox';
import './ToDoItem.css';
import TtTextbox from '../TtTextbox/TtTextbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ToDoItemProps {
    initialTitle?: string
}

const ToDoItem: React.FC<ToDoItemProps> = ({ initialTitle }) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(initialTitle || '');

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
                <FontAwesomeIcon icon="pen" onClick={testEdit}/>
                <FontAwesomeIcon icon="sync-alt" flip="horizontal"/>
                <FontAwesomeIcon icon="trash"/>
            </div>
        )
    }
}

export default ToDoItem;
