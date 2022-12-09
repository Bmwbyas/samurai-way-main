import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

import {Row} from "antd";
import {MessageOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {routes} from "../../Routes/Routes";

export const Navbar = () => {

    return (
        <Sider theme="dark" style={{backgroundColor:'#f5f5f5',marginTop:15}} >

            <Row className={s.navContainer}>
                <NavLink to={routes.myProfile}  className={s.nav}><UserOutlined/> <span className={s.name}>Profile</span></NavLink>
            </Row>
            <Row className={s.navContainer}>
                <NavLink to={routes.users} className={s.nav}><TeamOutlined /> <span className={s.name}>Users</span></NavLink>
            </Row>
            <Row className={s.navContainer}>
                <NavLink to={routes.dialogs} className={s.nav}><MessageOutlined /> <span className={s.name}>Messenger</span></NavLink>
            </Row>

        </Sider>

    )
}