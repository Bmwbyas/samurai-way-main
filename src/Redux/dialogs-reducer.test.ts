import {
    addMessageActionCreator,
    DialogsDataType,
    DialogsPageStateType,
    dialogsReducer,
    MessageDataType
} from "./dialogs-reduser";

let startState: DialogsPageStateType ;

beforeEach(() => {

    startState = { dialogsData: [
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
})

test('auth data should be changed', () => {
    const endState = dialogsReducer(startState, addMessageActionCreator('text'))

    expect(endState.messagesData[5].id).toBe(6);
    expect(endState.messagesData[5].message).toBe('text');


});