import React from 'react';
import {Field} from "redux-form";

const LoginForm = (props:any) => {

    return (

            <form onSubmit={props.handleSubmit}>
                <div><Field placeholder={'login'}name={'login'} component={'input'}/></div>
                <div><Field placeholder={'passwond'} name={'passwond'} component={'input'}/></div>
                <div><Field type={"checkbox"}name={'rememberMe'} component={'input'} />Remember me</div>
                <div><button>Submit</button></div>

            </form>

    );
};

export default LoginForm;