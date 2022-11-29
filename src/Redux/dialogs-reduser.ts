export type MessageDataType = {
    id: number
    message: string
    isMeMessage: boolean
}
export type touchedUsers={
    id:number
    name:string
}


type DialogsReducerActionType = ReturnType<typeof addMessage>|ReturnType<typeof addTochedUser>

export type DialogsPageStateType = typeof initialState

let initialState = {
    touchedUsers:[] as touchedUsers[],
    messagesData: [
        {id: 5, isMeMessage: true, message: 'Hi'},
        {id: 4, isMeMessage: false, message: 'it-kamasutra'},
        {id: 3, isMeMessage: true, message: 'yo'},
        {id: 2, isMeMessage: false, message: 'yo'},
        {id: 1, isMeMessage: true, message: 'yo'}
    ] as MessageDataType[],
}

export const dialogsReducer = (state = initialState, action: DialogsReducerActionType): DialogsPageStateType => {

    switch (action.type) {
        case 'DIALOGS/ADD-MESSAGE':
            let newMessage = {
                id: state.messagesData[0].id + 1,
                message: action.text,
                isMeMessage: true,
            }
            return {
                ...state,
                messagesData: [newMessage,...state.messagesData]
            };
        case "DIALOGS/ADD-TOCHED-USER":
            return {...state,touchedUsers: [...state.touchedUsers,action.payload]}

        default:
            return state;
    }
}
//actions
export const addMessage = (text: string) => ({type: 'DIALOGS/ADD-MESSAGE', text} as const)
export const addTochedUser = (data:touchedUsers) => ({type: 'DIALOGS/ADD-TOCHED-USER', payload:data} as const)

