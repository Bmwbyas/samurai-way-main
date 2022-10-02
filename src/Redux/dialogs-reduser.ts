export type DialogsDataType = {
    id: number
    name: string
}
export type MessageDataType = {
    id: number
    message: string
}


export const ADD_MESSAGE = 'ADD-MESSAGE';

type AddMessageActionType = ReturnType<typeof addMessageActionCreator>

type DialogsReduсerActionType = AddMessageActionType
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
        default:
            return state;
    }
}

export const addMessageActionCreator = (text:string) => ({type: ADD_MESSAGE,text} as const)
