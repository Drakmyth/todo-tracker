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
    list: string
    name: string
    starts: string
    ends: string
    recurrance: TodoItemRecurrance
}

interface RemoveItemAction {
    type: TodoItemsActions.REMOVE_ITEM
    item: string
}

interface ChangeItemNameAction {
    type: TodoItemsActions.CHANGE_ITEM_NAME
    item: string
    name: string
}

interface ChangeItemStartAction {
    type: TodoItemsActions.CHANGE_ITEM_START
    item: string
    starts: string
}

interface ChangeItemEndAction {
    type: TodoItemsActions.CHANGE_ITEM_END
    item: string
    ends: string
}

interface ChangeItemRecurranceAction {
    type: TodoItemsActions.CHANGE_ITEM_RECURRANCE
    item: string
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
    recurrance: TodoItemRecurrance): TodoItemsActionTypes {
    return {
        type: TodoItemsActions.ADD_ITEM,
        list,
        name,
        starts,
        ends,
        recurrance
    }
}

export function removeItem(item: string): TodoItemsActionTypes {
    return {
        type: TodoItemsActions.REMOVE_ITEM,
        item
    }
}

export function changeItemName(item: string, name: string): TodoItemsActionTypes {
    return {
        type: TodoItemsActions.CHANGE_ITEM_NAME,
        item,
        name
    }
}

export function changeItemStart(item: string, starts: string): TodoItemsActionTypes {
    return {
        type: TodoItemsActions.CHANGE_ITEM_START,
        item,
        starts
    }
}

export function changeItemEnd(item: string, ends: string): TodoItemsActionTypes {
    return {
        type: TodoItemsActions.CHANGE_ITEM_END,
        item,
        ends
    }
}

export function changeItemRecurrance(item: string, recurrance: TodoItemRecurrance): TodoItemsActionTypes {
    return {
        type: TodoItemsActions.CHANGE_ITEM_RECURRANCE,
        item,
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
            const id = v4()
            return {
                ...state,
                [id]: {
                    id: id,
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
            delete clone[action.item]
            return clone
        case TodoItemsActions.CHANGE_ITEM_NAME:
            return {
                ...state,
                [action.item]: {
                    ...state[action.item],
                    name: action.name
                }
            }
        case TodoItemsActions.CHANGE_ITEM_START:
            return {
                ...state,
                [action.item]: {
                    ...state[action.item],
                    starts: action.starts
                }
            }
        case TodoItemsActions.CHANGE_ITEM_END:
            return {
                ...state,
                [action.item]: {
                    ...state[action.item],
                    ends: action.ends
                }
            }
        case TodoItemsActions.CHANGE_ITEM_RECURRANCE:
            return {
                ...state,
                [action.item]: {
                    ...state[action.item],
                    recurrance: action.recurrance
                }
            }
        default:
            return state
    }
}

export default todoitemsReducer
