import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {Header} from "antd/es/layout/layout";
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Button} from "antd";
import defaultAvatarUser from "../../assets/defaultAvatarUser.png";

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logOutAuthUser: () => void
    avatar: null | string | undefined

}
export const HeaderJSX: React.FC<HeaderPropsType> = ({isAuth, logOutAuthUser, login, avatar}) => {
    const logOut = () => {
        logOutAuthUser()
    }
    return (
        <Header className={s.headerContainer}>
            <div className={s.logoContainer}>
               <NavLink to={'/profile'}> <span className={s.logoText}>Social network</span></NavLink>
            </div>
            <div className={s.loginBlock}>
                <div className={s.headerAvatar}>
                    {isAuth ?
                        <img className={s.avatar} src={avatar||defaultAvatarUser} alt="logo"/>
                        : <Avatar size={50} icon={<UserOutlined/>}/>}
                    <span className={s.styleNickname}>{login}</span>
                </div>
                {isAuth
                    ? <div><Button type="primary" onClick={logOut}>
                        <NavLink to={"/login"}></NavLink>LogOut
                    </Button></div>
                    : <Button type="primary" onClick={logOut}>
                        <NavLink to={"/login"}></NavLink>Login
                    </Button>}
            </div>
        </Header>
    );
}
// <button onClick={logOut}>LogOut</button>