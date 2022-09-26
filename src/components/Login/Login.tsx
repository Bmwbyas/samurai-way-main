import React from 'react';
import LoginForm from "./LoginForm";
import {reduxForm} from "redux-form";

export const Login = () => {
    const onSubmit=(formData:any)=>{
        console.log(formData)
    }
    return (
        <div>
           <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const LoginReduxForm=reduxForm({
    form:'login'
})(LoginForm)