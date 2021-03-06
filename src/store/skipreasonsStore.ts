import { v4 } from "uuid"

export enum SkipReasonsActions {
    ADD_REASON = "ADD_REASON",
    REMOVE_REASON = "REMOVE_REASON",
    CHANGE_REASON = "CHANGE_REASON",
    CHANGE_COLOR = "CHANGE_COLOR",
    OTHER = '__enforce_default__'
}

export interface SkipReasonsState {
    [key: string]: {
        id: string,
        list: string,
        reason: string,
        color: string
    }
}

interface AddReasonAction {
    type: SkipReasonsActions.ADD_REASON
    id: string
    list: string
    reason: string
    color: string
}

interface RemoveReasonAction {
    type: SkipReasonsActions.REMOVE_REASON
    id: string
}

interface ChangeReasonAction {
    type: SkipReasonsActions.CHANGE_REASON
    id: string
    reason: string
}

interface ChangeColorAction {
    type: SkipReasonsActions.CHANGE_COLOR
    id: string
    color: string
}

interface OtherAction {
    type: SkipReasonsActions.OTHER
}

export type SkipReasonsActionTypes = AddReasonAction |
    RemoveReasonAction |
    ChangeReasonAction |
    ChangeColorAction |
    OtherAction

export function addReason(list: string, reason: string, color?: string): AddReasonAction {
    return {
        type: SkipReasonsActions.ADD_REASON,
        id: v4(),
        color: color ?? '#000000',
        list,
        reason
    }
}

export function removeReason(id: string): RemoveReasonAction {
    return {
        type: SkipReasonsActions.REMOVE_REASON,
        id
    }
}

export function changeReason(id: string, reason: string): ChangeReasonAction {
    return {
        type: SkipReasonsActions.CHANGE_REASON,
        id,
        reason
    }
}

export function changeColor(id: string, color: string): ChangeColorAction {
    return {
        type: SkipReasonsActions.CHANGE_COLOR,
        id,
        color
    }
}

const InitialSkipReasonsState: SkipReasonsState = {}

function skipreasonsReducer(
    state = InitialSkipReasonsState,
    action: SkipReasonsActionTypes
): SkipReasonsState {
    switch (action.type) {
        case SkipReasonsActions.ADD_REASON:
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    list: action.list,
                    reason: action.reason,
                    color: action.color
                }
            }
        case SkipReasonsActions.REMOVE_REASON:
            var clone = {
                ...state
            }
            delete clone[action.id]
            return clone
        case SkipReasonsActions.CHANGE_REASON:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    reason: action.reason
                }
            }
        case SkipReasonsActions.CHANGE_COLOR:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    color: action.color
                }
            }
        default:
            return state
    }
}

export default skipreasonsReducer
