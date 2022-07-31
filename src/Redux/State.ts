export const ADD_POST = 'ADD-POST';
export const UPDATE_NEW_POSTS_TEXT = 'UPDATENEWPOSTSTEXT';
export const ADD_MESSAGE = 'ADDMESSAGE';
export const UPDATE_NEW_MESSAGE_TEXT = 'UPDATENEWMESSAGETEXT';


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
export type messagesPageType = {
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
    dialogsPage: messagesPageType
    navbarData: navbarDataType
}

export type StoreType={
    _state:StateType
    getState:()=>StateType
    callSubscriber:(state?:StateType)=>void //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // addPost:()=>void
    // updateNewPostsText:(newText: string)=>void
    // addMessage:()=>void
    // updateNewMessageText:(text:string)=>void
    subscribe:(observer:()=>void)=>void
    dispatch:(action:any)=>void         // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111111

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
        if(action.type===ADD_POST){
            let newPost = {
                id: 3,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.postData.unshift(newPost)
            this._state.profilePage.newPostText = ''
            this.callSubscriber(this._state)
        } else if(action.type===UPDATE_NEW_POSTS_TEXT){
            this._state.profilePage.newPostText = action.newText
            this.callSubscriber(this._state)
        }else {

            if(action.type===ADD_MESSAGE){
                        let newMessage = {
                            id: 6,
                            message: this._state.dialogsPage.newMessageText
                        }
                        this._state.dialogsPage.messagesData.push(newMessage)
                        this._state.dialogsPage.newMessageText = ''
                        this.callSubscriber(this._state)
                    }else {

                if(action.type===UPDATE_NEW_MESSAGE_TEXT){
                                        this._state.dialogsPage.newMessageText = action.text
                                        this.callSubscriber(this._state)
                                    }
            }
        }

    }
}
export const addPostActionCreator = () => ({type: ADD_POST})
export const onPostChangeActionCreator = (text:string) => ({type: UPDATE_NEW_POSTS_TEXT, newText:text})
export const addMessageActionCreator = () => ({type: ADD_MESSAGE})
export const onChangeMessageHandlerActionCreator = (text:string) => ({type: UPDATE_NEW_MESSAGE_TEXT, text:text})
