import React from 'react';
import s from './Dialogs.module.css'

import {DialogsItems} from "./DialogItem/DialogsItems";
import {Messages} from "./Message/Messages";
import { messagesPageType} from "../../Redux/State";

type DialogsPropsType={
    dialogsPage:messagesPageType
}
export const Dialogs = (props:DialogsPropsType) => {
    return (
        <div className={s.dialogs}>

            <DialogsItems dialogsData={props.dialogsPage.dialogsData} />
            <Messages messagesData={props.dialogsPage.messagesData}/>

        </div>
    );
}