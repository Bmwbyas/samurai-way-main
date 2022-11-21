import React from 'react';
import {Login} from "./Login";
import {connect} from "react-redux";
import {loginAuthUser, logOutAuthUser} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/redux-store";
import {SendLoginPropertyType} from "../../api/api";

export type LoginType=MapStateToPropsType& MapDispatchToPropsType
type MapDispatchToPropsType={
    loginAuthUser:(loginValue:SendLoginPropertyType)=>void
    logOutAuthUser:()=>void
}
const mapDispatchToProps={loginAuthUser,logOutAuthUser}
type MapStateToPropsType={isAuth:boolean,captcha:string|null}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth:state.auth.isAuth,
        captcha:state.auth.captcha
    }
}

export const LoginContainer=connect(mapStateToProps,mapDispatchToProps)(Login)
