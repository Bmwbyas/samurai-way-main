import { profileReduser} from "./profile-reduser";
import { dialogsReduser} from "./dialogs-reduser";
import {navbarReduser} from "./navbar-reduser";

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
export type navbarDataType = {
    navBarFriends: navBarFriendsType[]
}
export type StateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
    navbarData: navbarDataType
}
export type StoreType={
    _state:StateType
    getState:()=>StateType
    callSubscriber:(state?:StateType)=>void
       subscribe:(observer:()=>void)=>void
    dispatch:({type}:{type:string})=>void         // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111111

}

export let store:StoreType = {
    _state: {
        profilePage: {
            postData: [
                {id: 1, message: "Hi,how are you?", likesCount: 10},
                {id: 2, message: "It's my first post", likesCount: 16},
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogsData: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Valera'},
                {id: 5, name: 'Victor'}
            ],
            messagesData: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'it-kamasutra'},
                {id: 3, message: 'yo'},
                {id: 4, message: 'yo'},
                {id: 5, message: 'yo'}
            ],
            newMessageText: ''
        },
        navbarData: {
            navBarFriends: [
                {id: 1, name: 'Andrew'},
                {id: 2, name: 'Sasha'},
                {id: 3, name: 'Sveta'},
            ]
        }

    },
    getState(){
        return this._state
    },
    callSubscriber() {
        console.log('sss')
    },
    subscribe(observer: (state: any) => void)  {
        this.callSubscriber = observer
    },

    dispatch(action){
        this._state.profilePage=profileReduser(this._state.profilePage,action);
        this._state.dialogsPage=dialogsReduser(this._state.dialogsPage,action);
        this._state.navbarData=navbarReduser(this._state.navbarData,action);
        this.callSubscriber(this._state);



    }
}

