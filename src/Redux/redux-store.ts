import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reduser";
import {dialogsReducer} from "./dialogs-reduser";
import {navbarReducer} from "./navbar-reduser";
import {usersReducer} from "./users-reducer"
import {authReducer} from "./auth-reducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import {appReducer} from "./app-reducer";


let rootReducer=combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    navbarPage: navbarReducer,
    usersPage:usersReducer,
    auth:authReducer,
    form:formReducer,
    app:appReducer
});

export type AppStateType=ReturnType<typeof rootReducer>

export const store=createStore(rootReducer,applyMiddleware(thunk));


// @ts-ignore
window.store = store;