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
    name: string
    complete_color: string,
    incomplete_color: string
}

interface RemoveListAction {
    type: TodoListsActions.REMOVE_LIST
    list: string
}

interface ChangeListNameAction {
    type: TodoListsActions.CHANGE_LIST_NAME
    list: string
    name: string
}

interface ChangeListCompleteColor {
    type: TodoListsActions.CHANGE_LIST_COMPLETE_COLOR
    list: string
    color: string
}

interface ChangeListIncompleteColor {
    type: TodoListsActions.CHANGE_LIST_INCOMPLETE_COLOR
    list: string
    color: string
}

interface OtherAction {
    type: TodoListsActions.OTHER
}

export type TodoListsActionTypes = AddListAction |
    RemoveListAction |
    ChangeListNameAction |
    ChangeListCompleteColor |
    ChangeListIncompleteColor |
    OtherAction

export function addList(name: string, completeColor?: string, incompleteColor?: string): TodoListsActionTypes {
    return {
        type: TodoListsActions.ADD_LIST,
        complete_color: completeColor ?? '#0000FF',
        incomplete_color: incompleteColor ?? '#FF0000',
        name
    }
}

export function removeList(list: string): TodoListsActionTypes {
    return {
        type: TodoListsActions.REMOVE_LIST,
        list
    }
}

export function changeListName(list: string, name: string): TodoListsActionTypes {
    return {
        type: TodoListsActions.CHANGE_LIST_NAME,
        list,
        name
    }
}

export function changeListCompleteColor(list: string, color: string): TodoListsActionTypes {
    return {
        type: TodoListsActions.CHANGE_LIST_COMPLETE_COLOR,
        list,
        color
    }
}

export function changeListIncompleteColor(list: string, color: string): TodoListsActionTypes {
    return {
        type: TodoListsActions.CHANGE_LIST_INCOMPLETE_COLOR,
        list,
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
            const id = v4()
            return {
                ...state,
                [id]: {
                    id: id,
                    name: action.name,
                    complete_color: action.complete_color,
                    incomplete_color: action.incomplete_color
                }
            }
        case TodoListsActions.REMOVE_LIST:
            var clone = {
                ...state
            }
            delete clone[action.list]
            return clone
        case TodoListsActions.CHANGE_LIST_NAME:
            return {
                ...state,
                [action.list]: {
                    ...state[action.list],
                    name: action.name
                }
            }
        case TodoListsActions.CHANGE_LIST_COMPLETE_COLOR:
            return {
                ...state,
                [action.list]: {
                    ...state[action.list],
                    complete_color: action.color
                }
            }
        case TodoListsActions.CHANGE_LIST_INCOMPLETE_COLOR:
            return {
                ...state,
                [action.list]: {
                    ...state[action.list],
                    incomplete_color: action.color
                }
            }
        default:
            return state
    }
}

export default todolistsReducer
