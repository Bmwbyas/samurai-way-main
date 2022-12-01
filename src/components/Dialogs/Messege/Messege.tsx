import React from 'react';
import {Col, Divider, Row} from "antd";
import styleMyPosts from "../../Profile/MyPosts/MyPosts.module.css";
import sCommentForm from "../../Profile/MyPosts/CommentForm/CommentForm.module.css";
import {UsersDataType} from "../../../Redux/users-reducer";
import s from "./Message.module.css"
import {NavLink} from "react-router-dom";


type MessegePropsType = {
    avatar: string
    myAvatarValue: string
    f: UsersDataType
    messege: string
    addTochedUser:(data:{id:number,name:string})=>void
}
export const Messege: React.FC<MessegePropsType> = ({avatar, myAvatarValue, f, messege,addTochedUser}) => {


    return <NavLink to={'/dialog/' + f.id} onClick={()=>addTochedUser({id:f.id,name:f.name})} >
        <Row className={s.messageContainer} >

            <Col span={2}>
                <img className={styleMyPosts.avatar}
                     src={avatar}
                     alt="avatar"
                />
            </Col>
            <Col span={22}>

                <Row> {f.name} </Row>
                <Row align={"middle"} style={{marginBottom: 10}}>
                    <Col span={2}>
                        <Row justify={"center"}>
                            <img className={sCommentForm.avatar} src={myAvatarValue} alt="avatar"/>
                        </Row>
                    </Col>
                    <Col span={19}>
                        <span> {messege}</span>
                    </Col>
                </Row>

            </Col>


        </Row>
        <Divider style={{margin: 10}}/>
    </NavLink>
};

