import { v4 } from "uuid"

export enum TodoItemsActions {
    ADD_ITEM = "ADD_ITEM",
    REMOVE_ITEM = "REMOVE_ITEM",
    CHANGE_ITEM_NAME = "CHANGE_ITEM_NAME",
    CHANGE_ITEM_START = "CHANGE_ITEM_START",
    CHANGE_ITEM_END = "CHANGE_ITEM_END",
    CHANGE_ITEM_RECURRANCE = "CHANGE_ITEM_RECURRANCE",
    OTHER = '__enforce_default__'
}

export enum TodoItemRecurrance {
    PERSISTENT,
    DAILY,
    WEEKLY,
    MONTHLY,
    YEARLY
}

export interface TodoItemsState {
    [key: string]: {
        id: string,
        list: string,
        name: string,
        starts: string,
        ends: string,
        recurrance: TodoItemRecurrance
    }
}

interface AddItemAction {
    type: TodoItemsActions.ADD_ITEM
    id: string
    list: string
    name: string
    starts: string
    ends: string
    recurrance: TodoItemRecurrance
}

interface RemoveItemAction {
    type: TodoItemsActions.REMOVE_ITEM
    id: string
}

interface ChangeItemNameAction {
    type: TodoItemsActions.CHANGE_ITEM_NAME
    id: string
    name: string
}

interface ChangeItemStartAction {
    type: TodoItemsActions.CHANGE_ITEM_START
    id: string
    starts: string
}

interface ChangeItemEndAction {
    type: TodoItemsActions.CHANGE_ITEM_END
    id: string
    ends: string
}

interface ChangeItemRecurranceAction {
    type: TodoItemsActions.CHANGE_ITEM_RECURRANCE
    id: string
    recurrance: TodoItemRecurrance
}

interface OtherAction {
    type: TodoItemsActions.OTHER
}

export type TodoItemsActionTypes = AddItemAction |
    RemoveItemAction |
    ChangeItemNameAction |
    ChangeItemStartAction |
    ChangeItemEndAction |
    ChangeItemRecurranceAction |
    OtherAction

export function addItem(list: string,
    name: string,
    starts: string,
    ends: string,
    recurrance: TodoItemRecurrance): AddItemAction {
    return {
        type: TodoItemsActions.ADD_ITEM,
        id: v4(),
        list,
        name,
        starts,
        ends,
        recurrance
    }
}

export function removeItem(id: string): RemoveItemAction {
    return {
        type: TodoItemsActions.REMOVE_ITEM,
        id
    }
}

export function changeItemName(id: string, name: string): ChangeItemNameAction {
    return {
        type: TodoItemsActions.CHANGE_ITEM_NAME,
        id,
        name
    }
}

export function changeItemStart(id: string, starts: string): ChangeItemStartAction {
    return {
        type: TodoItemsActions.CHANGE_ITEM_START,
        id,
        starts
    }
}

export function changeItemEnd(id: string, ends: string): ChangeItemEndAction {
    return {
        type: TodoItemsActions.CHANGE_ITEM_END,
        id,
        ends
    }
}

export function changeItemRecurrance(id: string, recurrance: TodoItemRecurrance): ChangeItemRecurranceAction {
    return {
        type: TodoItemsActions.CHANGE_ITEM_RECURRANCE,
        id,
        recurrance
    }
}

const InitialTodoItemsState: TodoItemsState = {}

function todoitemsReducer(
    state = InitialTodoItemsState,
    action: TodoItemsActionTypes
): TodoItemsState {
    switch (action.type) {
        case TodoItemsActions.ADD_ITEM:
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    list: action.list,
                    name: action.name,
                    starts: action.starts,
                    ends: action.ends,
                    recurrance: action.recurrance
                }
            }
        case TodoItemsActions.REMOVE_ITEM:
            var clone = {
                ...state
            }
            delete clone[action.id]
            return clone
        case TodoItemsActions.CHANGE_ITEM_NAME:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    name: action.name
                }
            }
        case TodoItemsActions.CHANGE_ITEM_START:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    starts: action.starts
                }
            }
        case TodoItemsActions.CHANGE_ITEM_END:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    ends: action.ends
                }
            }
        case TodoItemsActions.CHANGE_ITEM_RECURRANCE:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    recurrance: action.recurrance
                }
            }
        default:
            return state
    }
}

export default todoitemsReducer
