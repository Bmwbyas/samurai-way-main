import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

import {Menu} from "antd";
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";

export const Navbar = () => {
    return (
        <Sider theme="dark" style={{backgroundColor:'#f5f5f5'}} >

            <Menu
                style={{backgroundColor:'#f5f5f5',borderRight:'none'}}
                theme="light"
                mode={'vertical'}
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined/>,
                        label: <NavLink to="/profile">Profile</NavLink>,
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined/>,
                        label: <NavLink to="/users">Users</NavLink>,
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined/>,
                        label: <NavLink to="/dialogs">Messages</NavLink>,
                    },
                ]}
            />

        </Sider>
        // <Sider style={{backgroundColor:'#f5f5f5'}}>
        //     <NavLink to="/profile">Profile</NavLink>
        //     <NavLink to="/users">Users</NavLink>
        //     <NavLink to="/dialogs">Messages</NavLink>
        //
        // </Sider>
    )
}