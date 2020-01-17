import { v4 } from "uuid"

export enum TodoListsActions {
    ADD_LIST = 'ADD_LIST',
    REMOVE_LIST = 'REMOVE_LIST',
    CHANGE_LIST_NAME = 'CHANGE_LIST_NAME',
    ADD_SKIP_REASON = 'ADD_SKIP_REASON',
    REMOVE_SKIP_REASON = 'REMOVE_SKIP_REASON',
    OTHER = '__enforce_default__'
}

export interface TodoListsState {
    [key: string]: {
        id: string,
        name: string,
        skip_reasons: string[]
    }
}

interface AddListAction {
    type: TodoListsActions.ADD_LIST
    name: string
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

interface AddSkipReasonAction {
    type: TodoListsActions.ADD_SKIP_REASON
    list: string
    reason: string
}

interface RemoveSkipReasonAction {
    type: TodoListsActions.REMOVE_SKIP_REASON
    list: string
    reason: string
}

interface OtherAction {
    type: TodoListsActions.OTHER
}

export type TodoListsActionTypes = AddListAction |
    RemoveListAction |
    ChangeListNameAction |
    AddSkipReasonAction |
    RemoveSkipReasonAction |
    OtherAction

export function addList(name: string): TodoListsActionTypes {
    return {
        type: TodoListsActions.ADD_LIST,
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

export function addSkipReason(list: string, reason: string): TodoListsActionTypes {
    return {
        type: TodoListsActions.ADD_SKIP_REASON,
        list,
        reason
    }
}

export function removeSkipReason(list: string, reason: string): TodoListsActionTypes {
    return {
        type: TodoListsActions.REMOVE_SKIP_REASON,
        list,
        reason
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
                    skip_reasons: []
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
        case TodoListsActions.ADD_SKIP_REASON:
            var add_reasons = state[action.list].skip_reasons.slice()
            add_reasons.push(action.reason)
            return {
                ...state,
                [action.list]: {
                    ...state[action.list],
                    skip_reasons: add_reasons
                }
            }
        case TodoListsActions.REMOVE_SKIP_REASON:
            var remove_reasons = state[action.list].skip_reasons.filter(
                (reason => reason !== action.reason)
            )
            return {
                ...state,
                [action.list]: {
                    ...state[action.list],
                    skip_reasons: remove_reasons
                }
            }
        default:
            return state
    }
}

export default todolistsReducer
