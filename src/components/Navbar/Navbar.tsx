import React from 'react';

import {NavLink} from "react-router-dom";

import {Menu} from "antd";
import {MessageOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";

export const Navbar = () => {
    return (
        <Sider theme="dark" style={{backgroundColor:'#f5f5f5'}} >

            <Menu
                style={{backgroundColor:'#f5f5f5',borderRight:'none'}}
                theme="light"
                mode={'vertical'}

                items={[
                    {
                        key: '1',
                        icon: <UserOutlined/>,
                        label: <NavLink to="/profile">Profile</NavLink>,
                    },
                    {
                        key: '2',
                        icon: <TeamOutlined />,
                        label: <NavLink to="/users">Users</NavLink>,
                    },
                    {
                        key: '3',
                        icon: <MessageOutlined />,
                        label: <NavLink to="/dialogs">Messenger</NavLink>,
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