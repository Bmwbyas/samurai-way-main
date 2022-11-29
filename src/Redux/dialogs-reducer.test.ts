import {
    addMessage,
    DialogsPageStateType,
    dialogsReducer,
    MessageDataType
} from "./dialogs-reduser";


let startState: DialogsPageStateType ;

beforeEach(() => {

    startState = {

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
    const endState = dialogsReducer(startState, addMessage('text'))

    expect(endState.messagesData[5].id).toBe(6);
    expect(endState.messagesData[5].message).toBe('text');


});