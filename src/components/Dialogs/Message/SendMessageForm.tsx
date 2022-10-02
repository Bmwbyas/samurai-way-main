import React from 'react';
import s from "../Dialogs.module.css";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/FormsControl";
import {maxLenghtCreator, required} from "../../../utils/validators/validators";

let maxLenght=maxLenghtCreator(10)

const SendMessageForm = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder={'Enter your message'}   name={'newMessageText'} component={Textarea} validate={[required,maxLenght]}/></div>
            <div> <button className={s.addMessage}>add Message</button></div>
        </form>
    );
};
export const SendMessageFormRedux=reduxForm({form:'dialogAddMessageForm'})(SendMessageForm)