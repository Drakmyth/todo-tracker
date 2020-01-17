import { v4 } from "uuid"

export enum CompletionsActions {
    COMPLETE_ITEM = "COMPLETE_ITEM",
    SKIP_ITEM = "SKIP_ITEM",
    REMOVE_COMPLETION = "REMOVE_COMPLETION",
    OTHER = '__enforce_default__'
}

export enum CompletionStatus {
    COMPLETE,
    SKIPPED
}

export interface CompletionsState {
    [key: string]: {
        id: string,
        item: string,
        date: string,
        status: CompletionStatus,
        reason: string | null
    }
}

interface CompleteItemAction {
    type: CompletionsActions.COMPLETE_ITEM
    date: string
    item: string
}

interface SkipItemAction {
    type: CompletionsActions.SKIP_ITEM
    date: string
    item: string
    reason: string
}

interface RemoveCompletionAction {
    type: CompletionsActions.REMOVE_COMPLETION
    completion: string
}

interface OtherAction {
    type: CompletionsActions.OTHER
}

export type CompletionsActionTypes = CompleteItemAction |
    SkipItemAction |
    RemoveCompletionAction |
    OtherAction

export function completeItem(date: string,
    item: string): CompletionsActionTypes {
    return {
        type: CompletionsActions.COMPLETE_ITEM,
        date,
        item
    }
}

export function skipItem(date: string,
    item: string,
    reason: string): CompletionsActionTypes {
    return {
        type: CompletionsActions.SKIP_ITEM,
        date,
        item,
        reason
    }
}

export function removeCompletion(completion: string): CompletionsActionTypes {
    return {
        type: CompletionsActions.REMOVE_COMPLETION,
        completion
    }
}

const InitialCompletionsState: CompletionsState = {}

function completionsReducer(
    state = InitialCompletionsState,
    action: CompletionsActionTypes
): CompletionsState {
    switch (action.type) {
        case CompletionsActions.COMPLETE_ITEM:
            const complete_id = v4()
            return {
                ...state,
                [complete_id]: {
                    id: complete_id,
                    item: action.item,
                    date: action.date,
                    status: CompletionStatus.COMPLETE,
                    reason: null
                }
            }
        case CompletionsActions.SKIP_ITEM:
            const skipped_id = v4()
            return {
                ...state,
                [skipped_id]: {
                    id: skipped_id,
                    item: action.item,
                    date: action.date,
                    status: CompletionStatus.SKIPPED,
                    reason: action.reason
                }
            }
        case CompletionsActions.REMOVE_COMPLETION:
            var clone = {
                ...state
            }
            delete clone[action.completion]
            return clone
        default:
            return state
    }
}

export default completionsReducer
