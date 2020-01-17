import { combineReducers } from "redux"
import systemReducer from "./systemStore"
import colorsReducer from "./colorsStore"
import todolistsReducer from "./todolistsStore"
import todoitemsReducer from "./todoitemsStore"
import skipreasonsReducer from "./skipreasonsStore"
import completionsReducer from "./completionsStore"

export const rootReducer = combineReducers({
    system: systemReducer,
    colors: colorsReducer,
    todolists: todolistsReducer,
    todoitems: todoitemsReducer,
    skipreasons: skipreasonsReducer,
    completions: completionsReducer
})

export type RootState = ReturnType<typeof rootReducer>