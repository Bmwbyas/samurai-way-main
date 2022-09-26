export type DialogsDataType = {
    id: number
    name: string
}
export type MessageDataType = {
    id: number
    message: string
}


export const ADD_MESSAGE = 'ADD-MESSAGE';
export const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
type AddMessageActionType = ReturnType<typeof addMessageActionCreator>
type UpdateNewMessageTextActionType = {
    type: 'UPDATE-NEW-MESSAGE-TEXT'
    text: string
}
type DialogsReduсerActionType = AddMessageActionType | UpdateNewMessageTextActionType
export type DialogsPageStateType=typeof initialState

let initialState = {
    dialogsData: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Valera'},
        {id: 5, name: 'Victor'}
    ] as DialogsDataType[],
    messagesData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'it-kamasutra'},
        {id: 3, message: 'yo'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'yo'}
    ] as MessageDataType[],

}

export const dialogsReducer = (state = initialState, action: DialogsReduсerActionType):DialogsPageStateType => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 6,
                message: action.text
            }

            // state.newMessageText = ''
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            };
        // case UPDATE_NEW_MESSAGE_TEXT:
        //     state.newMessageText = action.text
        //     return {
        //         ...state,
        //         newMessageText:action.text
        //     };
        default:
            return state;
    }
}

export const addMessageActionCreator = (text:string) => ({type: ADD_MESSAGE,text} as const)
export const onChangeMessageHandlerActionCreator = (text: string) => ({type: UPDATE_NEW_MESSAGE_TEXT, text: text} as const)