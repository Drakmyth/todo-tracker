import React, { useState } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import './ToDoList.css';
import TtTextbox from '../TtTextbox/TtTextbox';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootStore';
import { addItem, TodoItemRecurrance } from '../../store/todoitemsStore';

interface ToDoListProps {
    id: string | null;
}

const ToDoList: React.FC<ToDoListProps> = (props) => {

    const todolist = useSelector((state: RootState) => state.todolists[props.id as string]);
    const todoitems = useSelector((state: RootState) => state.todoitems)
    const dispatch = useDispatch();
    const [showPlaceholder, setShowPlaceholder] = useState(false);

    if (!props.id) return <div />;

    const displayPlaceholder = () => {
        setShowPlaceholder(true);
    }

    const onTextboxCommit = (text: string) => {
        setShowPlaceholder(false);
        if (text === '') {
            return;
        }
        console.log(`Adding item ${text}`)
        dispatch(addItem(todolist.id, text, "", "", TodoItemRecurrance.DAILY));
    }

    return (
        <div className="ToDoList">
            <header>{todolist?.name}</header>
            {
                Object.keys(todoitems)
                    .filter((key: string) => todoitems[key].list === todolist.id)
                    .map((key: string) => {
                        return <ToDoItem key={todoitems[key].id} initialTitle={todoitems[key].name} />
                    })
            }
            {showPlaceholder && <TtTextbox initialText="" onTextboxCommit={onTextboxCommit} />}
            <button onClick={displayPlaceholder}>Add Item</button>
        </div>
    );
}

export default ToDoList;
