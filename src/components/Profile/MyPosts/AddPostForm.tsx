import React from 'react';
import {Field, reduxForm} from "redux-form";
import s from "../../Dialogs/Dialogs.module.css";
import {maxLenghtCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControl/FormsControl";


let maxLenght=maxLenghtCreator(10)

const AddPostForm = (props:any) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Add new post'}   name={'addPost'} component={Textarea} validate={[required,maxLenght]}/>
                </div>
            <div> <button className={s.addMessage}>add Post</button></div>
        </form>

    );
};
 export const AddPostFormRedux=reduxForm({form:'AddPostProfileForm'})(AddPostForm)
