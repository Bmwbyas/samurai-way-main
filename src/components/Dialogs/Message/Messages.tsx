import React from 'react';
import s from './../Dialogs.module.css'
import {MessageDataType} from "../../../Redux/dialogs-reduser";



type messageItemPropsType={
    messagesData:MessageDataType[]
}
type MessagePropsType = {
    message: string
    id: number
}

const MessageItem = (props: MessagePropsType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export const Messages = (props:messageItemPropsType) => {


    let messagesElement = props.messagesData.map(s => <MessageItem key={s.id} message={s.message} id={s.id}/>)
    return (
        <div className={s.messages}>
            {messagesElement}
        </div>
    );
}