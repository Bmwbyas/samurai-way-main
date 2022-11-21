import React from 'react';
import s from './Dialogs.module.css'
import {DialogsItems} from "./DialogItem/DialogsItems";
import {Messages} from "./Message/Messages";
import {DialogsPropsType} from "./DialogsContainer";
import {SendMessageForm} from "./Message/SendMessageForm";


export const Dialogs = (props:DialogsPropsType) => {
    return (
        <div className={s.dialogs}>

            <DialogsItems dialogsData={props.dialogsPage.dialogsData} />
            <Messages messagesData={props.dialogsPage.messagesData}/>
            <SendMessageForm addNewMessage={props.addMessageActionCreator}/>
        </div>
    );
}