
export enum ColorsActions {
    CHANGE_COMPLETE_COLOR = "CHANGE_COMPLETE_COLOR",
    CHANGE_INCOMPLETE_COLOR = "CHANGE_INCOMPLETE_COLOR",
    CHANGE_SKIP_REASON_COLOR = "CHANGE_SKIP_REASON_COLOR",
    OTHER = '__enforce_default__'
}

export interface ColorsState {
    [key: string]: {
        complete: string,
        incomplete: string,
        skip_reasons: {
            [key: string]: string
        }
    }
}

interface ChangeCompleteColorAction {
    type: ColorsActions.CHANGE_COMPLETE_COLOR
    list: string
    color: string
}

interface ChangeIncompleteColorAction {
    type: ColorsActions.CHANGE_INCOMPLETE_COLOR
    list: string
    color: string
}

interface ChangeSkipReasonColorAction {
    type: ColorsActions.CHANGE_SKIP_REASON_COLOR
    list: string
    reason: string
    color: string
}

interface OtherAction {
    type: ColorsActions.OTHER
}

export type ColorsActionTypes = ChangeCompleteColorAction |
    ChangeIncompleteColorAction |
    ChangeSkipReasonColorAction |
    OtherAction

export function changeCompleteColor(list: string, color: string): ColorsActionTypes {
    return {
        type: ColorsActions.CHANGE_COMPLETE_COLOR,
        list,
        color
    }
}

export function changeIncompleteColor(list: string, color: string): ColorsActionTypes {
    return {
        type: ColorsActions.CHANGE_INCOMPLETE_COLOR,
        list,
        color
    }
}

export function changeSkipReasonColor(list: string, reason: string, color: string): ColorsActionTypes {
    return {
        type: ColorsActions.CHANGE_SKIP_REASON_COLOR,
        list,
        reason,
        color
    }
}

const InitialColorsState: ColorsState = {}

function colorsReducer(
    state = InitialColorsState,
    action: ColorsActionTypes
): ColorsState {
    switch (action.type) {
        case ColorsActions.CHANGE_COMPLETE_COLOR:
            return {
                ...state,
                [action.list]: {
                    ...state[action.list],
                    complete: action.color
                }
            }
        case ColorsActions.CHANGE_INCOMPLETE_COLOR:
            return {
                ...state,
                [action.list]: {
                    ...state[action.list],
                    incomplete: action.color
                }
            }
        case ColorsActions.CHANGE_SKIP_REASON_COLOR:
            return {
                ...state,
                [action.list]: {
                    ...state[action.list],
                    skip_reasons: {
                        ...state[action.list].skip_reasons,
                        [action.reason]: action.color
                    }
                }
            }
        default:
            return state
    }
}

export default colorsReducer
