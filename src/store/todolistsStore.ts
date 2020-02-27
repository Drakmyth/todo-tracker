import { v4 } from "uuid"

export enum TodoListsActions {
    ADD_LIST = 'ADD_LIST',
    REMOVE_LIST = 'REMOVE_LIST',
    CHANGE_LIST_NAME = 'CHANGE_LIST_NAME',
    CHANGE_LIST_COMPLETE_COLOR = 'CHANGE_LIST_COMPLETE_COLOR',
    CHANGE_LIST_INCOMPLETE_COLOR = 'CHANGE_LIST_INCOMPLETE_COLOR',
    OTHER = '__enforce_default__'
}

export interface TodoListsState {
    [key: string]: {
        id: string,
        name: string,
        complete_color: string,
        incomplete_color: string
    }
}

interface AddListAction {
    type: TodoListsActions.ADD_LIST
    id: string
    name: string
    complete_color: string,
    incomplete_color: string
}

interface RemoveListAction {
    type: TodoListsActions.REMOVE_LIST
    id: string
}

interface ChangeListNameAction {
    type: TodoListsActions.CHANGE_LIST_NAME
    id: string
    name: string
}

interface ChangeListCompleteColorAction {
    type: TodoListsActions.CHANGE_LIST_COMPLETE_COLOR
    id: string
    color: string
}

interface ChangeListIncompleteColorAction {
    type: TodoListsActions.CHANGE_LIST_INCOMPLETE_COLOR
    id: string
    color: string
}

interface OtherAction {
    type: TodoListsActions.OTHER
}

export type TodoListsActionTypes = AddListAction |
    RemoveListAction |
    ChangeListNameAction |
    ChangeListCompleteColorAction |
    ChangeListIncompleteColorAction |
    OtherAction

export function addList(name: string, completeColor?: string, incompleteColor?: string): AddListAction {
    return {
        type: TodoListsActions.ADD_LIST,
        id: v4(),
        complete_color: completeColor ?? '#0000FF',
        incomplete_color: incompleteColor ?? '#FF0000',
        name
    }
}

export function removeList(id: string): RemoveListAction {
    return {
        type: TodoListsActions.REMOVE_LIST,
        id
    }
}

export function changeListName(id: string, name: string): ChangeListNameAction {
    return {
        type: TodoListsActions.CHANGE_LIST_NAME,
        id,
        name
    }
}

export function changeListCompleteColor(id: string, color: string): ChangeListCompleteColorAction {
    return {
        type: TodoListsActions.CHANGE_LIST_COMPLETE_COLOR,
        id,
        color
    }
}

export function changeListIncompleteColor(id: string, color: string): ChangeListIncompleteColorAction {
    return {
        type: TodoListsActions.CHANGE_LIST_INCOMPLETE_COLOR,
        id,
        color
    }
}

const InitialTodoListsState: TodoListsState = {}

function todolistsReducer(
    state = InitialTodoListsState,
    action: TodoListsActionTypes
): TodoListsState {
    switch (action.type) {
        case TodoListsActions.ADD_LIST:
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    name: action.name,
                    complete_color: action.complete_color,
                    incomplete_color: action.incomplete_color
                }
            }
        case TodoListsActions.REMOVE_LIST:
            var clone = {
                ...state
            }
            delete clone[action.id]
            return clone
        case TodoListsActions.CHANGE_LIST_NAME:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    name: action.name
                }
            }
        case TodoListsActions.CHANGE_LIST_COMPLETE_COLOR:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    complete_color: action.color
                }
            }
        case TodoListsActions.CHANGE_LIST_INCOMPLETE_COLOR:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    incomplete_color: action.color
                }
            }
        default:
            return state
    }
}

export default todolistsReducer
