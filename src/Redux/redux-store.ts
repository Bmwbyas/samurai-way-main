import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reduser";
import {dialogsReducer} from "./dialogs-reduser";
import {navbarReducer} from "./navbar-reduser";
import {usersReducer} from "./users-reducer"

let rootReducer=combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    navbarPage: navbarReducer,
    usersPage:usersReducer,
});

export type AppStateType=ReturnType<typeof rootReducer>

export const store=createStore(rootReducer);