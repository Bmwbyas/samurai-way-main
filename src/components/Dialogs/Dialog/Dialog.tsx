import React from 'react';
import {NavLink} from "react-router-dom";
import sProfilePage from "../../Profile/ProfileInfo/ProfileInfo.module.css";
import {Divider, Row} from "antd";

export const Dialog = () => {
    return (
        <div className={sProfilePage.profileInfoContainer}>
            <Row>
                <NavLink to={'/dialogs'}>Back</NavLink>
            </Row>
            <Divider style={{margin: 10}}/>
        </div>
    );
};

