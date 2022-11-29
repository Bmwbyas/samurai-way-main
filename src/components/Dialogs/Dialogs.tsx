import React from 'react';
import {DialogsPropsType} from "./DialogsContainer";
import sProfilePage from "../Profile/ProfileInfo/ProfileInfo.module.css";

import {Col, Row} from "antd";
import {Search} from "../common/Search/Search";
import SingleUser from "../Profile/ProfileInfo/SingleUser/SingleUser";
import defaultAvatar from '../../assets/defaultAvatarUser.png'
import {Messege} from "./Messege/Messege";

export const Dialogs: React.FC<DialogsPropsType> = ({friends, myAvatar,}) => {

    const friendsData = friends.map((f) => {
        const avatar = f.photos.small ?? defaultAvatar
        return <SingleUser key={f.id} id={f.id} name={f.name} photo={avatar}/>
    })
    const messages = friends.map((f) => {
            const myAvatarValue = myAvatar ?? defaultAvatar
            const avatar = f.photos.small ?? defaultAvatar
            const vievDialog = () => {
            }
            return <Messege key={f.id} avatar={avatar} myAvatarValue={myAvatarValue} f={f} message={'motya'}/>
        }
    )

    return (
        <>

            <Row>
                <Col className="gutter-row" span={15}>
                    <div className={sProfilePage.profileInfoContainer}>
                        <Row>
                            <Search/>
                        </Row>
                        <Row>
                            {friendsData}
                        </Row>
                    </div>
                    <div className={sProfilePage.profileInfoContainer}>
                        {messages}
                    </div>
                </Col>
                <Col className="gutter-row" span={9}>
                    <div>sdfsdffs</div>
                </Col>
            </Row>


        </>
    );
}