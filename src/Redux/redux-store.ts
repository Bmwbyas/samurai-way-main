import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reduser";
import {dialogsReducer} from "./dialogs-reduser";
import {navbarReducer} from "./navbar-reduser";
export type postDataType = {
    id: number
    message: string
    likesCount: number
}
export type dialogsDataType = {
    id: number
    name: string
}
export type messageDataType = {
    id: number
    message: string
}
export type profilePageType = {
    postData: postDataType[]
    newPostText: string
}
export type dialogsPageType = {
    dialogsData: dialogsDataType[]
    messagesData: messageDataType[]
    newMessageText: string
}
export type navBarFriendsType = {
    id: number
    name: string
}
export type navbarPageType = {
    navBarFriends: navBarFriendsType[]
}
export type StateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
    navbarPage: navbarPageType
}
export type StoreType={
    _state:StateType
    getState:()=>StateType
    callSubscriber:(state?:StateType)=>void
    subscribe:(observer:()=>void)=>void
    dispatch:({type}:{type:string})=>void         // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111111

}




let rootReducer=combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    navbarPage: navbarReducer,
});
export type AppStateType=ReturnType<typeof rootReducer>

export const store:any=createStore(rootReducer);