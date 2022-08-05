import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'

import {DialogsItems} from "./DialogItem/DialogsItems";
import {Messages} from "./Message/Messages";
import {dialogsPageType} from "../../Redux/Store";


type DialogsPropsType={
    dialogsPage:dialogsPageType
    newMessageText:string
    addMessage:()=>void
    updateNewMessage:(newMessage:string)=>void
}
export const Dialogs = (props:DialogsPropsType) => {

    const addMessageHandler=()=>{
        props.addMessage()
    }
    const onChangeMessageHandler=(e:ChangeEvent<HTMLTextAreaElement>)=>{
        let text=e.currentTarget.value
        props.updateNewMessage(text)
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