import {combineReducers, createStore} from "redux";
import {profileReduser} from "./profile-reduser";
import {dialogsReduser} from "./dialogs-reduser";
import {navbarReduser} from "./navbar-reduser";



let reducers=combineReducers({
    profilePage:profileReduser,
    dialogsPage:dialogsReduser,
    navbarData: navbarReduser,
});

export let store=createStore(reducers);