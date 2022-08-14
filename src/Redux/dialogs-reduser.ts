import {dialogsPageType} from "./redux-store";

export const ADD_MESSAGE = 'ADD-MESSAGE';
export const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
type AddMessageActionType = {
    type: 'ADD-MESSAGE'
}
type UpdateNewMessageTextActionType = {
    type: 'UPDATE-NEW-MESSAGE-TEXT'
    text: string
}
type DialogsReduсerActionType = AddMessageActionType | UpdateNewMessageTextActionType
let initialState: dialogsPageType = {
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
}

export const dialogsReducer = (state = initialState, action: DialogsReduсerActionType) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 6,
                message: state.newMessageText
            }

            // state.newMessageText = ''
            return {
                ...state,
                newMessageText:'',
                messagesData: [...state.messagesData, newMessage]
            };
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.text
            return {
                ...state,
                newMessageText:action.text
            };
        default:
            return state;
    }
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE})
export const onChangeMessageHandlerActionCreator = (text: string) => ({type: UPDATE_NEW_MESSAGE_TEXT, text: text})