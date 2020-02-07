import React, { useState } from 'react';
import './ToDoItem.scss';
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
                <input type="text" value={title} onChange={(event) => onTextboxCommit(event.target.value)} />
            </div>
        )
    }
    else {
        return (
            <div className="ToDoItem">
                <label>{title}<input type="checkbox" /></label>
                <FontAwesomeIcon icon="pen" onClick={testEdit} />
                <FontAwesomeIcon icon="sync-alt" flip="horizontal" />
                <FontAwesomeIcon icon="trash" />
            </div>
        )
    }
}

export default ToDoItem;
