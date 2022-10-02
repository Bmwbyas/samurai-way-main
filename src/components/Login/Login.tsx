import React from 'react';
import LoginForm from "./LoginForm";
import {reduxForm} from "redux-form";
import {loginAuthUser, logOutAuthUser} from "../../Redux/auth-reducer";
import {SendLoginPropertyType} from "../../api/api";
import {LoginType} from "./LoginContainer";
import {Redirect} from "react-router-dom";


export const Login:React.FC<LoginType> = ({loginAuthUser,isAuth}) => {
    const onSubmit=(formData:any)=>{
        console.log(formData)
        loginAuthUser(formData)
    }
    if (isAuth){
        return <Redirect to={"/profile"}/>
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

