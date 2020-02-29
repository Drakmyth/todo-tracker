import React, { useState } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import './ToDoList.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootStore';

interface ToDoListProps {
    id: string | null
    className?: string
}

const ToDoList: React.FC<ToDoListProps> = (props) => {

    const todolist = useSelector((state: RootState) => state.todolists[props.id as string]);
    const todoitems = useSelector((state: RootState) => state.todoitems)
    const [showPlaceholder, setShowPlaceholder] = useState(false);

    if (!props.id) return <div className="todo-list"/>;

    const displayPlaceholder = () => {
        setShowPlaceholder(true);
    }
    
    return (
        <div className="todo-list">
            <header>{todolist?.name}</header>
            {
                Object.keys(todoitems)
                    .filter((key: string) => todoitems[key].list === todolist.id)
                    .map((key: string) => {
                        return <ToDoItem key={todoitems[key].id} initialTitle={todoitems[key].name} />
                    })
            }
            <button onClick={displayPlaceholder} disabled={showPlaceholder}>Add Item</button>
        </div>
    );
}

export default ToDoList;
