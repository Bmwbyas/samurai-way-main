import { profileReducer} from "./profile-reduser";
import { dialogsReducer} from "./dialogs-reduser";
import {navbarReducer} from "./navbar-reduser";
type postDataType = {
    id: number
    message: string
    likesCount: number
}
type dialogsDataType = {
    id: number
    name: string
}
type messageDataType = {
    id: number
    message: string
}
type profilePageType = {
    postData: postDataType[]
    newPostText: string
}
type dialogsPageType = {
    dialogsData: dialogsDataType[]
    messagesData: messageDataType[]
    newMessageText: string
}
type navBarFriendsType = {
    id: number
    name: string
}
type navbarDataType = {
    navBarFriends: navBarFriendsType[]
}
type StateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
    navbarData: navbarDataType
}
type StoreType={
    _state:StateType
    getState:()=>StateType
    callSubscriber:(state?:StateType)=>void
       subscribe:(observer:()=>void)=>void
    dispatch:({type}:{type:string})=>void         // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111111

}
let store:StoreType = {
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
        // @ts-ignore
        this._state.profilePage=profileReducer(this._state.profilePage,action);
        // @ts-ignore
        this._state.dialogsPage=dialogsReducer(this._state.dialogsPage,action);
        // @ts-ignore
        this._state.navbarData=navbarReducer(this._state.navbarData,action);
        // @ts-ignore
        this.callSubscriber(this._state);



    }
}

