import React, { RefObject} from 'react';
import s from './Dialogs.module.css'

import {DialogsItems} from "./DialogItem/DialogsItems";
import {Messages} from "./Message/Messages";
import { messagesPageType} from "../../Redux/State";

type DialogsPropsType={
    dialogsPage:messagesPageType
    addMessage: () => void
    updateNewMessageText: (text: string) => void
    newMessageText:string
}
export const Dialogs = (props:DialogsPropsType) => {
    const newMessageElement:RefObject<HTMLTextAreaElement>=React.createRef();
    const addMessageHandler=()=>{
        props.addMessage()
    }
    const onChangeMessageHandler=()=>{
        let text=newMessageElement?.current?.value
        if(text) props.updateNewMessageText(text)
    }
    return (
        <div className={s.dialogs}>

            <DialogsItems dialogsData={props.dialogsPage.dialogsData} />
            <Messages messagesData={props.dialogsPage.messagesData}/>
            <textarea ref={newMessageElement} value={props.newMessageText} onChange={onChangeMessageHandler} ></textarea>
            <button className={s.addMessage} onClick={addMessageHandler}>add Message</button>
        </div>
    );
}