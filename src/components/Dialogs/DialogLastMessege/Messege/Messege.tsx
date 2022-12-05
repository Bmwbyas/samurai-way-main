import React, {forwardRef} from 'react';
import {Col, Divider, Row} from "antd";
import styleMyPosts from "../../../Profile/MyPosts/MyPosts.module.css";
import sCommentForm from "../../../Profile/MyPosts/CommentForm/CommentForm.module.css";
import {UsersDataType} from "../../../../Redux/users-reducer";
import s from "./Message.module.css"
import {NavLink} from "react-router-dom";
import {routes} from "../../../../Routes/Routes";


type MessegePropsType = {
    avatar: string
    myAvatarValue: string
    f: UsersDataType
    messege: string
    addTochedUser:(data:{id:number,name:string})=>void


}
export const Messege =forwardRef<any,MessegePropsType> (({avatar, myAvatarValue, f, messege,addTochedUser},ref) => {


    return <NavLink  to={routes.toDialog + f.id} ref={ref} onClick={()=>addTochedUser({id:f.id,name:f.name})} >
        <Row justify={"space-evenly"} className={s.messageContainer} >

            <Col >
                <img className={styleMyPosts.avatar}
                     src={avatar}
                     alt="avatar"
                />
            </Col>
            <Col >
                <Row> {f.name} </Row>
                <Row align={"middle"} style={{marginBottom: 10}}>
                    <Col >
                        <Row justify={"center"}>
                            <img className={sCommentForm.avatar} src={myAvatarValue} alt="avatar"/>
                        </Row>
                    </Col>
                    <Col >
                        <span className={s.messege}> {messege}</span>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Divider style={{margin: 10}}/>
    </NavLink>
})

