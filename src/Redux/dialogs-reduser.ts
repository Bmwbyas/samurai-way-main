export type MessageDataType = {
    id: number
    message: string
    isMeMessage:boolean
}

type DialogsReducerActionType = ReturnType<typeof addMessage>

export type DialogsPageStateType=typeof initialState

let initialState = {

    messagesData: [
        {id: 1,isMeMessage:true, message: 'Hi'},
        {id: 2, isMeMessage:false, message: 'it-kamasutra'},
        {id: 3, isMeMessage:true, message: 'yo'},
        {id: 4,  isMeMessage:false, message: 'yo'},
        {id: 5, isMeMessage:true, message: 'yo'}
    ] as MessageDataType[],

}

export const dialogsReducer = (state = initialState, action: DialogsReducerActionType):DialogsPageStateType => {

    switch (action.type) {
        case 'DIALOGS/ADD-MESSAGE':
            let newMessage = {
                id: state.messagesData[0].id+1,
                message: action.text,
                isMeMessage:true,
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            };
        default:
            return state;
    }
}

export const addMessage = (text:string) => ({type: 'DIALOGS/ADD-MESSAGE',text} as const)

