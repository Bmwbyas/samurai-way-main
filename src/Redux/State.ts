let rerenderEntierTree = () => {
    console.log('sss')
}

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
    callSubscriber:(state?:StateType)=>void
    addPost:()=>void
    updateNewPostsText:(newText: string)=>void
    addMessage:()=>void
    updateNewMessageText:(text:string)=>void
    subscribe:(observer:()=>void)=>void

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
            newMessageText: 'yo'
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
    addPost () {
        let newPost = {
            id: 3,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.postData.unshift(newPost)
        this._state.profilePage.newPostText = ''
        this.callSubscriber(this._state)
    },
    updateNewPostsText (newText: string) {
        this._state.profilePage.newPostText = newText
        this.callSubscriber(this._state)
    },
    addMessage  ()  {
        let newMessage = {
            id: 6,
            message: this._state.dialogsPage.newMessageText
        }
        this._state.dialogsPage.messagesData.unshift(newMessage)
        this._state.dialogsPage.newMessageText = ''
        this.callSubscriber(this._state)
    },
    updateNewMessageText  (text: string)  {
        this._state.dialogsPage.newMessageText = text
        this.callSubscriber(this._state)
    },

   subscribe(observer: (state: any) => void)  {
        this.callSubscriber = observer
    }

}

// export let state: StateType = {
//     profilePage: {
//         postData: [
//             {id: 1, message: "Hi,how are you?", likesCount: 10},
//             {id: 2, message: "It's my first post", likesCount: 16},
//         ],
//         newPostText: ''
//     },
//     dialogsPage: {
//         dialogsData: [
//             {id: 1, name: 'Dimych'},
//             {id: 2, name: 'Andrey'},
//             {id: 3, name: 'Sveta'},
//             {id: 4, name: 'Valera'},
//             {id: 5, name: 'Victor'}
//         ],
//         messagesData: [
//             {id: 1, message: 'Hi'},
//             {id: 2, message: 'it-kamasutra'},
//             {id: 3, message: 'yo'},
//             {id: 4, message: 'yo'},
//             {id: 5, message: 'yo'}
//         ],
//         newMessageText: 'yo'
//     },
//     navbarData: {
//         navBarFriends: [
//             {id: 1, name: 'Andrew'},
//             {id: 2, name: 'Sasha'},
//             {id: 3, name: 'Sveta'},
//         ]
//     }
//
// }


// export const addPost = () => {
//     let newPost = {
//         id: 3,
//         message: state.profilePage.newPostText,
//         likesCount: 0
//     }
//     state.profilePage.postData.unshift(newPost)
//     state.profilePage.newPostText = ''
//     rerenderEntierTree()
// }
// export const updateNewPostsText = (newText: string) => {
//     state.profilePage.newPostText = newText
//     rerenderEntierTree()
// }
// export const addMessage = () => {
//     let newMessage = {
//         id: 6,
//         message: state.dialogsPage.newMessageText
//     }
//     state.dialogsPage.messagesData.unshift(newMessage)
//     state.dialogsPage.newMessageText = ''
//     rerenderEntierTree()
// }
// export const updateNewMessageText = (text: string) => {
//     state.dialogsPage.newMessageText = text
//     rerenderEntierTree()
// }
//
// export const subscribe = (observer: () => void) => {
//     rerenderEntierTree = observer
// }