import React from 'react';
import s from "../Dialogs.module.css";
import {Field, reduxForm} from "redux-form";



const SendMessageForm = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder={'Enter your message'}   name={'newMessageText'} component={'textarea'}/></div>
            <div> <button className={s.addMessage}>add Message</button></div>
        </form>
    );
};
export const SendMessageFormRedux=reduxForm({form:'dialogAddMessageForm'})(SendMessageForm)