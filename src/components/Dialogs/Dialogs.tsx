import React from 'react';
import {DialogsPropsType} from "./DialogsContainer";
import sProfilePage from "../Profile/ProfileInfo/ProfileInfo.module.css";
import {Col, Row} from "antd";
import {Search} from "../common/Search/Search";
import {FriendsList} from "./FriendsList/FriendsList";
import {DialogLastMessage} from "./DialogLastMessege/DialogLastMessage";
import {NavDialogs} from "./NavDialogs/NavDialogs";

export const Dialogs: React.FC<DialogsPropsType> = ({
                                                        friends, myAvatar,
                                                        tochedUsers, addTochedUser, message
                                                    }) => {
    console.log('dialogs')
    return (
        <>

            <Row style={{marginTop: 20}}>
                <Col className="gutter-row" span={15}>
                    <div className={sProfilePage.profileInfoContainer}>
                        <Search friends={friends} addTochedUser={addTochedUser}/>
                        <FriendsList friends={friends} addTochedUser={addTochedUser}/>
                    </div>
                    <div className={sProfilePage.profileInfoContainer}>
                       <DialogLastMessage friends={friends} addTochedUser={addTochedUser} myAvatar={myAvatar} messege={message}/>
                    </div>
                </Col>
                <Col className="gutter-row" span={9}>
                    <NavDialogs tochedUsers={tochedUsers}/>
                </Col>
            </Row>
        </>
    );
}