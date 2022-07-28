export type postDataType = {
    id: number
    message: string
    likesCount: number
}
export type dialogsDataType={
    id:number
    name:string
}
export type messageDataType={
    id:number
    message:string
}
export type profilePageType={
    postData:postDataType[]
}
export type messagesPageType={
    dialogsData:dialogsDataType[]
    messagesData:messageDataType[]
}
export type navBarFriendsType={
    id:number
    name:string
}
export type navbarDataType={
    navBarFriends:navBarFriendsType[]
}
export type StateType={
    profilePage:profilePageType
    dialogsPage:messagesPageType
    navbarData:navbarDataType
}

export let State:StateType={
    profilePage:{postData : [
    {id: 1, message: "Hi,how are you?", likesCount: 10},
    {id: 2, message: "It's my first post", likesCount: 16},
]},
    dialogsPage:{dialogsData : [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Andrey'},
    {id: 3, name: 'Sveta'},
    {id: 4, name: 'Valera'},
    {id: 5, name: 'Victor'}
],
    messagesData : [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'it-kamasutra'},
    {id: 3, message: 'yo'},
    {id: 4, message: 'yo'},
    {id: 5, message: 'yo'}
]},
    navbarData:{navBarFriends:[
        {id:1,name:'Andrew'},
        {id:2,name:'Sasha'},
        {id:3,name:'Sveta'},
        ]}

}