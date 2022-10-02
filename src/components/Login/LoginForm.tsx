import React from 'react';
import {Field} from "redux-form";
import {Input} from "../common/FormsControl/FormsControl";
import {maxLenghtCreator, required} from "../../utils/validators/validators";
import s from '../common/FormsControl/FormsControl.module.css'
const maxLenght10=maxLenghtCreator(30)
const LoginForm = (props:any) => {

    return (

            <form onSubmit={props.handleSubmit}>
                <div><Field placeholder={'login'}name={'email'} component={Input} validate={[required,maxLenght10]}/></div>
                <div><Field placeholder={'password'} type={'password'} name={'password'} component={Input} validate={[required,maxLenght10]}/></div>
                <div><Field type={"checkbox"}name={'rememberMe'} component={Input} />Remember me</div>
                {props.error && <div className={s.formSummuryError}>{props.error}</div>}
                <div><button>Submit</button></div>

            </form>

    );
};

export default LoginForm;