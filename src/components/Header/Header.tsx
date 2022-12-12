import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {Header} from "antd/es/layout/layout";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Dropdown, MenuProps, Space, Tooltip} from "antd";
import defaultAvatar from "../../assets/defaultAvatar.png";
import {routes} from "../../Routes/Routes";

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logOutAuthUser: () => void
    avatar: null | string | undefined

}
export const HeaderTSX: React.FC<HeaderPropsType> = ({isAuth, logOutAuthUser, login, avatar}) => {
    const logOut = () => {
        logOutAuthUser()
    }

    const viewAvatar = avatar ?? defaultAvatar
    const items: MenuProps['items'] = [
        {
            key: '0',
            label: <Tooltip title="my profile" key="profile"  placement="left"  color={'#1369e1'}>
                <NavLink to={routes.myProfile}>{login}</NavLink>
            </Tooltip>
        },

        {
            label: <div onClick={logOut}> LogOut </div>,
            key: '1',
        },
    ];
    return (
        <Header className={s.headerContainer}>
            <div className={s.logoContainer}>
                <NavLink to={routes.myProfile}> <span className={s.logoText}>Social network</span></NavLink>
            </div>
            <div className={s.loginBlock}>
                {isAuth&&
                <Dropdown  className={s.dropdown} menu={{items}} trigger={['click']}>

                    <Space>
                        <div className={s.headerAvatar}>
                            {isAuth ?
                                <img className={s.avatar} src={viewAvatar} alt="logo"/>
                                : <Avatar size={50} icon={<UserOutlined style={{color: "white"}}/>}/>}
                            {/*<span className={s.styleNickname}>{login}</span>*/}
                        </div>
                        <DownOutlined/>
                    </Space>

                </Dropdown>
                }

            </div>

        </Header>
    );
}
