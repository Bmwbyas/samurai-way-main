import React from 'react';
import './Header.module.css'
import s from './Header.module.css'
import {NavLink} from "react-router-dom";


type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logOutAuthUser:()=>void

}
export const Header = (props: HeaderPropsType) => {
    const logOut=()=>{
        props.logOutAuthUser()
    }
    return (
        <header className={s.header}>
            <img
                src="https://play-lh.googleusercontent.com/ahJtMe0vfOlAu1XJVQ6rcaGrQBgtrEZQefHy7SXB7jpijKhu1Kkox90XDuH8RmcBOXNn"
                alt="logo"/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={logOut}>LogOut</button></div>
                    : <NavLink to={"/login"}>Login</NavLink>}
            </div>11
        </header>
    );
}