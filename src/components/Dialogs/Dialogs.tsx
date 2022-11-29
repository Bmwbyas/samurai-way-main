import React from 'react';
import {DialogsPropsType} from "./DialogsContainer";
import sProfilePage from "../Profile/ProfileInfo/ProfileInfo.module.css";
import s from './Dialogs.module.css'
import {Col, Divider, Row} from "antd";
import {Search} from "../common/Search/Search";
import SingleUser from "../Profile/ProfileInfo/SingleUser/SingleUser";
import defaultAvatar from '../../assets/defaultAvatarUser.png'
import {Messege} from "./Messege/Messege";
import {NavLink} from "react-router-dom";
import {TochedUser} from "./Dialog/TochedUser/TochedUser";

export const Dialogs: React.FC<DialogsPropsType> = ({friends, myAvatar,
                                                        tochedUsers,addTochedUser,message}) => {

    const friendsData = friends.map((f) => {
        const avatar = f.photos.small ?? defaultAvatar
        return <SingleUser key={f.id} navigate={'/dialog/'} id={f.id} name={f.name} photo={avatar}/>
    })
    const messages = friends.map((f) => {
            const myAvatarValue = myAvatar ?? defaultAvatar
            const avatar = f.photos.small ?? defaultAvatar

            return <Messege key={f.id} addTochedUser={addTochedUser} avatar={avatar} myAvatarValue={myAvatarValue} f={f} message={message}/>
        }
    )
    const tochedUserDialog=tochedUsers.map(t=><TochedUser id={t.id} name={t.name}/>)

    return (
        <>

            <Row style={{marginTop: 20}}>
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
                    <div className={sProfilePage.profileInfoContainer}>
                        <NavLink to={'/dialogs'} style={{color: "black"}}>
                            <Row justify={"center"} className={s.allChat} >
                                All chat
                            </Row>
                        </NavLink>
                        <Divider style={{margin: 10}}/>

                            {tochedUserDialog}

                    </div>
                </Col>
            </Row>


        </>
    );
}