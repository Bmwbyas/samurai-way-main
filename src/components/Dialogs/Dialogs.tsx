import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'

import {DialogsItems} from "./DialogItem/DialogsItems";
import {Messages} from "./Message/Messages";
import {

    addMessageActionCreator,
    messagesPageType,
    onChangeMessageHandlerActionCreator
} from "../../Redux/State";

type DialogsPropsType={
    dialogsPage:messagesPageType
    newMessageText:string
    dispatch: (action: any) => void
}
export const Dialogs = (props:DialogsPropsType) => {

    const addMessageHandler=()=>{
        props.dispatch(addMessageActionCreator())
    }
    const onChangeMessageHandler=(e:ChangeEvent<HTMLTextAreaElement>)=>{
        let text=e.currentTarget.value
        if(text) props.dispatch(onChangeMessageHandlerActionCreator(text))
    }
    return (
        <div className={s.dialogs}>

            <DialogsItems dialogsData={props.dialogsPage.dialogsData} />
            <Messages messagesData={props.dialogsPage.messagesData}/>
            <textarea value={props.newMessageText} onChange={onChangeMessageHandler} placeholder='Enter new message'></textarea>
            <button className={s.addMessage} onClick={addMessageHandler}>add Message</button>
        </div>
    );
}