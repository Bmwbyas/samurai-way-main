export type MessageDataType = {
    id: number
    message: string
    isMeMessage: boolean
}
export type TouchedUsers ={
    id:number
    name:string
}


type DialogsReducerActionType = ReturnType<typeof addMessage>|ReturnType<typeof addTochedUser>

export type DialogsPageStateType = typeof initialState

let initialState = {
    touchedUsers:[] as TouchedUsers[],
    messagesData: [
        {id: 1, isMeMessage: true, message: 'Hi'},
        {id: 2, isMeMessage: false, message: 'it-kamasutra'},
        {id: 3, isMeMessage: true, message: 'yo'},
        {id: 4, isMeMessage: false, message: 'yo'},
        {id: 5, isMeMessage: true, message: 'yo'}
    ] as MessageDataType[],
}

export const dialogsReducer = (state = initialState, action: DialogsReducerActionType): DialogsPageStateType => {

    switch (action.type) {
        case 'DIALOGS/ADD-MESSAGE':
            let newMessage = {
                id: state.messagesData.length + 1,
                message: action.text,
                isMeMessage: true,
            }
            return {
                ...state,
                messagesData: [...state.messagesData,newMessage]
            };
        case "DIALOGS/ADD-TOCHED-USER":
            if(state.touchedUsers.find(t=>t.id===action.payload.id)){
                return {...state}
            }
            return {...state,touchedUsers: [...state.touchedUsers,action.payload]}

        default:
            return state;
    }
}
//actions
export const addMessage = (text: string) => ({type: 'DIALOGS/ADD-MESSAGE', text} as const)
export const addTochedUser = (data:TouchedUsers) => ({type: 'DIALOGS/ADD-TOCHED-USER', payload:data} as const)

