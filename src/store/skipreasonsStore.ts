import { v4 } from "uuid"

export enum SkipReasonsActions {
    ADD_REASON = "ADD_REASON",
    REMOVE_REASON = "REMOVE_REASON",
    CHANGE_REASON = "CHANGE_REASON",
    OTHER = '__enforce_default__'
}

export interface SkipReasonsState {
    [key: string]: {
        id: string,
        reason: string,
    }
}

interface AddReasonAction {
    type: SkipReasonsActions.ADD_REASON
    reason: string
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

interface OtherAction {
    type: SkipReasonsActions.OTHER
}

export type SkipReasonsActionTypes = AddReasonAction |
    RemoveReasonAction |
    ChangeReasonAction |
    OtherAction

export function addReason(reason: string): SkipReasonsActionTypes {
    return {
        type: SkipReasonsActions.ADD_REASON,
        reason
    }
}

export function removeReason(id: string): SkipReasonsActionTypes {
    return {
        type: SkipReasonsActions.REMOVE_REASON,
        id
    }
}

export function changeReason(id: string, reason: string): SkipReasonsActionTypes {
    return {
        type: SkipReasonsActions.CHANGE_REASON,
        id,
        reason
    }
}

const InitialSkipReasonsState: SkipReasonsState = {}

function skipreasonsReducer(
    state = InitialSkipReasonsState,
    action: SkipReasonsActionTypes
): SkipReasonsState {
    switch (action.type) {
        case SkipReasonsActions.ADD_REASON:
            const id = v4()
            return {
                ...state,
                [id]: {
                    id: id,
                    reason: action.reason
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
        default:
            return state
    }
}

export default skipreasonsReducer
