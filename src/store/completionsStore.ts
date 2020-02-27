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
    id: string
    date: string
    item: string
}

interface SkipItemAction {
    type: CompletionsActions.SKIP_ITEM
    id: string
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

export function completeItem(date: string, item: string): CompleteItemAction {
    return {
        type: CompletionsActions.COMPLETE_ITEM,
        id: v4(),
        date,
        item
    }
}

export function skipItem(date: string, item: string, reason: string): SkipItemAction {
    return {
        type: CompletionsActions.SKIP_ITEM,
        id: v4(),
        date,
        item,
        reason
    }
}

export function removeCompletion(completion: string): RemoveCompletionAction {
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
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    item: action.item,
                    date: action.date,
                    status: CompletionStatus.COMPLETE,
                    reason: null
                }
            }
        case CompletionsActions.SKIP_ITEM:
            return {
                ...state,
                [action.id]: {
                    id: action.id,
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
