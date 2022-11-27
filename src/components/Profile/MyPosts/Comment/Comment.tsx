import {Col, Divider, Row} from 'antd';
import React from 'react';
import {CommentType} from "../../../../Redux/profile-reduser";
import sCommentForm from "../CommentForm/CommentForm.module.css";
import s from "./Comment.module.css"
import LikeButton from "../../../common/LikeButton/LikeButton";

type CommentsPropsType = {
    c: CommentType
    postId: string
    avatar: string
    name: string
    toggleLike:(payload: { postId: string; id?: string; likeValue: number;}) =>void
}
export const Comment: React.FC<CommentsPropsType> = ({c, postId,toggleLike, name, avatar}) => {
    const toggleLikeComment=(likeValue:number)=>{
        toggleLike({postId,id:c.id,likeValue})
    }
    return <>
        <Divider/>
        <Row align={"middle"} style={{marginBottom: 10}}>
            <Col span={2}>
                <Row justify={"center"}>
                    <img className={sCommentForm.avatar} src={avatar} alt="avatar"/>
                </Row>
            </Col>
            <Col span={19}>
                <span className={s.name}> {name}</span>
            </Col>
        </Row>

        <Row className={s.comentConatainer}>
            <Col span={2}></Col>
            <Col span={15}>
                <span>{c.comment} </span>
            </Col>
            <Col span={5}>
                <LikeButton  toggleLike = {toggleLikeComment} likesCount={c.like}/>
            </Col>
        </Row>


    </>


}
