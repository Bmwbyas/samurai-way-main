import React from 'react';

import {StoreType} from "../../Redux/Store";
import {addMessageActionCreator, onChangeMessageHandlerActionCreator} from "../../Redux/dialogs-reduser";
import {Dialogs} from "./Dialogs";

type DialogsPropsType = {
    store: StoreType
}
export const DialogsContainer = (props: DialogsPropsType) => {

    const addMessageHandler = () => {
        props.store.dispatch(addMessageActionCreator())
    }
    const onChangeMessageHandler = (text: string) => {

        if (text) props.store.dispatch(onChangeMessageHandlerActionCreator(text))
    }
    return (
        <Dialogs
            addMessage={addMessageHandler}
            newMessageText={props.store._state.dialogsPage.newMessageText}
            updateNewMessage={onChangeMessageHandler}
            dialogsPage={props.store._state.dialogsPage}
        />
    );
}