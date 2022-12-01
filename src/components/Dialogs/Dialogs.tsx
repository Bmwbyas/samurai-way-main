import React from 'react';
import {DialogsPropsType} from "./DialogsContainer";
import sProfilePage from "../Profile/ProfileInfo/ProfileInfo.module.css";
import s from './Dialogs.module.css'
import {Anchor, Col, Divider, Row} from "antd";
import {Search} from "../common/Search/Search";
import {Messege} from "./Messege/Messege";
import {NavLink} from "react-router-dom";
import {TochedUser} from "./Dialog/TochedUser/TochedUser";
import {FriendsList} from "./FriendsList/FriendsList";
import {vievAvatar} from "../../utils/ViewAvatar/viewAvatar";

export const Dialogs: React.FC<DialogsPropsType> = ({
                                                        friends, myAvatar,
                                                        tochedUsers, addTochedUser, message
                                                    }) => {


    const messages = friends.map((f) => {
            const myAvatarValue = vievAvatar(myAvatar)
            const avatar = vievAvatar(f.photos.small)

            return <Messege key={f.id} addTochedUser={addTochedUser} avatar={avatar} myAvatarValue={myAvatarValue} f={f}
                            message={message}/>
        }
    )
    const tochedUserDialog = tochedUsers.map(t => <TochedUser key={t.id} id={t.id} name={t.name}/>)

    return (
        <>

            <Row style={{marginTop: 20}}>
                <Col className="gutter-row" span={15}>
                    <div className={sProfilePage.profileInfoContainer}>
                        <Search friends={friends}/>
                        <FriendsList friends={friends}/>
                    </div>
                    <div className={sProfilePage.profileInfoContainer}>
                        {messages}
                    </div>
                </Col>
                <Col className="gutter-row" span={9}>
                    <Anchor style={{border: "none"}}>
                        <div className={sProfilePage.profileInfoContainer}>
                            <NavLink to={'/dialogs'} style={{color: "black"}}>
                                <Row justify={"center"} className={s.allChat}>
                                    All chat
                                </Row>
                            </NavLink>
                            <Divider style={{margin: 10}}/>
                            {tochedUserDialog}
                        </div>
                    </Anchor>
                </Col>
            </Row>
        </>
    );
}