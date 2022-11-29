import React from 'react';
import {Col, Divider, Row} from "antd";
import sCommentForm from "../../../Profile/MyPosts/CommentForm/CommentForm.module.css";
import s from "../../../Profile/MyPosts/Comment/Comment.module.css";

type SingleDialogType={
    myAvatarValue:string
    myUserName:string|null
    message:string
    isMeMessage:boolean
    userName:string
    avatarValue:string

}
export const SingleDialog:React.FC<SingleDialogType> = ({myUserName,message,myAvatarValue,
                                                            avatarValue,isMeMessage,userName}) => {
    const avatar=isMeMessage?myAvatarValue:avatarValue
    const name=isMeMessage?myUserName:userName
    return (
        <>
            <Divider style={{margin: 10}}/>
            <Row align={"middle"} style={{marginBottom: 10}}>
                <Col span={2}>
                    <Row justify={"center"}>
                        <img className={sCommentForm.avatar} src={avatar} alt="avatar"/>
                    </Row>
                </Col>
                <Col span={19}>
                    <span > {name}</span>
                </Col>
            </Row>

            <Row className={s.comentConatainer}>
                <Col span={2}></Col>
                <Col span={15}>
                    <span>{message} </span>
                </Col>
                <Col span={5}>

                </Col>
            </Row>
        </>
    );
};

