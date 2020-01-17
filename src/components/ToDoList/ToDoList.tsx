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
    const todoitems = useSelector((state: RootState) =>
        Object.keys(state.todoitems)
            .filter((key: string) => state.todoitems[key].list === props.id)
            .map((key: string) => state.todoitems[key]))
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
        // listItems.push(text);
        // setListItems(listItems.slice(0));
    }

    return (
        <div className="ToDoList">
            <span>ID: {todolist?.id}</span>
            <span>Name: {todolist?.name}</span>
            {showPlaceholder && <TtTextbox initialText="" onTextboxCommit={onTextboxCommit} />}
            <button onClick={displayPlaceholder}><span>Add Item</span></button>
            <hr />
            {
                todoitems.map((i, idx) => {
                    return <ToDoItem key={idx} initialTitle={i.name} />
                })
            }
        </div>
    );
}

export default ToDoList;
