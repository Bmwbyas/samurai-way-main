
import {AnyAction} from "redux";

export const ADD_MESSAGE = 'ADDMESSAGE';
export const UPDATE_NEW_MESSAGE_TEXT = 'UPDATENEWMESSAGETEXT';

let initialState=  {
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

export const dialogsReduser = (state= initialState, action: AnyAction) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 6,
                message: state.newMessageText
            }
            state.messagesData.push(newMessage)
            state.newMessageText = ''
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.text
            return state;
        default:
            return state;
    }
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE})
export const onChangeMessageHandlerActionCreator = (text:string) => ({type: UPDATE_NEW_MESSAGE_TEXT, text:text})