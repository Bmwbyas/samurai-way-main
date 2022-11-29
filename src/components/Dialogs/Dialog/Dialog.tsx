import React from 'react';
import {NavLink} from "react-router-dom";
import sProfilePage from "../../Profile/ProfileInfo/ProfileInfo.module.css";
import {Col, Row} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import sCommentForm from "../../Profile/MyPosts/CommentForm/CommentForm.module.css";
import defaultAvatarUser from "./../../../assets/defaultAvatarUser.png"
import {SingleDialog} from "./SingleDialog/SingleDialog";
import {CommentForm} from "../../Profile/MyPosts/CommentForm/CommentForm";
import {MessageDataType} from "../../../Redux/dialogs-reduser";


type DialogPropsType = {
    userName: string
    avatar: string | null

    myAvatar: string | null | undefined
    myUserName: string | null
    addMessage: (text: string) => void
    dialogsData: MessageDataType[]
}
export const Dialog: React.FC<DialogPropsType> = ({
                                                      addMessage, dialogsData,
                                                      userName, avatar, myAvatar,
                                                      myUserName,
                                                  }) => {


    const avatarValue = avatar ?? defaultAvatarUser
    const myAvatarValue = myAvatar ?? defaultAvatarUser
    const dialogsUsers = dialogsData.map(d => <SingleDialog key={d.id} isMeMessage={d.isMeMessage}
                                                            myUserName={myUserName}
                                                            message={d.message} myAvatarValue={myAvatarValue}
                                                            userName={userName} avatarValue={avatarValue}
    />)
    return (<Row gutter={5} style={{marginTop: 20}}>
            <Col className="gutter-row" span={15}>
                <div className={sProfilePage.profileInfoContainer}>
                    <Row>
                        <Col span={3}>
                            <NavLink to={'/dialogs'} style={{color: "black"}}> <LeftOutlined/> Back</NavLink>
                        </Col>
                        <Col span={18}>
                            <Row justify={"center"}>{userName}</Row>
                        </Col>
                        <Col span={3}>
                            <img className={sCommentForm.avatar} src={avatarValue} alt="avatar"/>
                        </Col>
                    </Row>
                    {dialogsUsers}
                    <CommentForm photo={myAvatarValue} name={myUserName} submitForm={addMessage}/>
                </div>
            </Col>
            <Col className="gutter-row" span={9}>
                <Row>All chat</Row>
            </Col>
        </Row>
    );
};

