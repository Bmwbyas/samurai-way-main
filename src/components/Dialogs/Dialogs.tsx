import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogsItems} from "./DialogItem/DialogsItems";
import {Messages} from "./Message/Messages";
import {DialogsPropsType} from "./DialogsContainer";
import { SendMessageFormRedux} from "./Message/SendMessageForm";

export const Dialogs = (props:DialogsPropsType) => {

    // const addMessageHandler=()=>{
    //     props.addMessage()
    // }
    // const onChangeMessageHandler=(e:ChangeEvent<HTMLTextAreaElement>)=>{
    //     let text=e.currentTarget.value
    //     props.updateNewMessage(text)
    // }
    const addNewMessage=(formData:any)=>{
        props.addMessage(formData.newMessageText)
    }

    return (
        <div className={s.dialogs}>

            <DialogsItems dialogsData={props.dialogsPage.dialogsData} />
            <Messages messagesData={props.dialogsPage.messagesData}/>
            <SendMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    );
}