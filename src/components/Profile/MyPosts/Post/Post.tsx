import React from 'react';
import './Post.module.css'
import {LikeOutlined, MessageOutlined} from '@ant-design/icons';
import defaultAvatar from "../../../../assets/defaultAvatarUser.png";
import {Button, Col, Row} from "antd";
import style from "../../ProfileInfo/ProfileInfo.module.css";
import styleMyPosts from "../MyPosts.module.css";
import s from './Post.module.css'
import {CommentForm} from "../CommentForm/CommentForm";
import {CommentsStateType} from "../../../../Redux/profile-reduser";

type PostPropsType = {
    postId:string
    message: string
    likesCount: number
    avatarProfile: string | null | undefined
    name: string
    addComment:(payload: {postId: string, comment: string}) => void
    commentData:CommentsStateType
}

export const Post: React.FC<PostPropsType> = ({avatarProfile,postId,commentData,addComment, message, likesCount, name}) => {
    const avatar = avatarProfile ?? defaultAvatar
    return (
        <div className={style.profileInfoContainer}>

            <Row>
                <Row align={"middle"} className={s.marginBottom}>
                    <img className={styleMyPosts.avatar}
                         src={avatar}
                         alt="avatar"
                    />
                    <span> {name}</span>
                </Row>
            </Row>
            <Row className={s.marginBottom}>{message}</Row>
            <Row gutter={8} >
                <Col>
                    <Button type="default" >
                        <LikeOutlined /> <span>{likesCount}</span>
                    </Button>
                </Col>
                <Col>
                    <Button type="default" >
                        <MessageOutlined /> Comment
                    </Button>
                </Col>
            </Row>
                <CommentForm name={name} postId={postId} addComment={addComment} photo={avatarProfile} />

                {commentData[postId].map(c=><div key={c.id}>{c.comment}</div>)}



        </div>

    );
}