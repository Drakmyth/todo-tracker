import { combineReducers } from "redux"

export interface ToDoList {
    id: string
    name: string
}

export interface ListCollectionState {
    [key: string]: ToDoList
}

export const ADD_LIST = 'ADD_LIST'
export const DELETE_LIST = 'DELETE_LIST'

interface AddListAction {
    type: typeof ADD_LIST
    payload: ToDoList
}

interface DeleteListAction {
    type: typeof DELETE_LIST
    meta: {
        id: string
    }
}

export type ListCollectionActionTypes = AddListAction | DeleteListAction

export function addList(newList: ToDoList): ListCollectionActionTypes {
    return {
        type: ADD_LIST,
        payload: newList
    }
}

export function deleteList(id: string): ListCollectionActionTypes {
    return {
        type: DELETE_LIST,
        meta: {
            id
        }
    }
}

export function listCollectionReducer(
    state = {},
    action: ListCollectionActionTypes
): ListCollectionState {
    switch (action.type) {
        case ADD_LIST:
            return { ...state, [action.payload.id]: action.payload}
        case DELETE_LIST:
            let new_todolists: ListCollectionState = { ...state };
            delete new_todolists[action.meta.id]
            return new_todolists
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    todolists: listCollectionReducer
})

export type RootState = ReturnType<typeof rootReducer>