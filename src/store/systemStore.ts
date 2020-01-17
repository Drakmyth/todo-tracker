
export enum SystemActions {
    SELECT_LIST = 'SELECT_LIST',
    SELECT_ITEM = 'SELECT_ITEM',
    OTHER = '__enforce_default__'
}

export interface SystemState {
    selectedList: string | null,
    selectedItem: string | null
}

interface SelectListAction {
    type: SystemActions.SELECT_LIST
    id: string
}

interface SelectItemAction {
    type: SystemActions.SELECT_ITEM
    id: string
}

interface OtherAction {
    type: SystemActions.OTHER
}

export type SystemActionTypes = SelectListAction |
    SelectItemAction |
    OtherAction

export function selectList(id: string): SystemActionTypes {
    return {
        type: SystemActions.SELECT_LIST,
        id
    }
}

export function selectItem(id: string): SystemActionTypes {
    return {
        type: SystemActions.SELECT_ITEM,
        id
    }
}

const InitialSystemState: SystemState = {
    selectedList: null,
    selectedItem: null
}

function systemReducer(
    state = InitialSystemState,
    action: SystemActionTypes
): SystemState {
    switch (action.type) {
        case SystemActions.SELECT_LIST:
            return {
                ...state,
                selectedList: action.id,
                selectedItem: null
            }
        case SystemActions.SELECT_ITEM:
            return {
                ...state,
                selectedItem: action.id
            }
        default:
            return state
    }
}

export default systemReducer
