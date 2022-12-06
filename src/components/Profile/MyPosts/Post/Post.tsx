import React from 'react';
import './Post.module.css'
import {MessageOutlined} from '@ant-design/icons';
import {Button, Col, Row} from "antd";
import style from "../../ProfileInfo/ProfileInfo.module.css";
import styleMyPosts from "../MyPosts.module.css";
import s from './Post.module.css'
import {CommentForm} from "../CommentForm/CommentForm";
import {CommentsStateType} from "../../../../Redux/profile-reduser";
import {Comment} from "../Comment/Comment";
import LikeButton from "../../../common/LikeButton/LikeButton";
import {viewAvatar} from "../../../../utils/ViewAvatar/viewAvatar";

type PostPropsType = {
    postId: string
    message: string
    likesCount: number
    avatarProfile: string | null | undefined
    name: string
    addComment: (payload: { postId: string, comment: string }) => void
    commentData: CommentsStateType
    toggleLike:(payload: { postId: string; id?: string; likeValue: number;}) =>void
}

export const Post: React.FC<PostPropsType> = ({
                                                  avatarProfile,
                                                  postId,
                                                  commentData,
                                                  addComment,
                                                  message,
                                                  likesCount,
                                                  name,
                                                  toggleLike

                                              }) => {
    const avatar = viewAvatar(avatarProfile)
    
    const [showComment, setShowComment] = React.useState(true)
    const showCommentHandler = () => {
        setShowComment(!showComment)
    }
    const toggleLikePost=(like:number)=>{
        toggleLike({postId,likeValue:like})
    }
    const addCommentHandler=(text:string)=>{
        addComment({postId,comment:text})
    }
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
            <Row gutter={8}>
                <Col>

                    <LikeButton  toggleLike={toggleLikePost} likesCount={likesCount}/>
                </Col>
                <Col>
                    <Button onClick={showCommentHandler} type="default">
                        <MessageOutlined /> Comment
                    </Button>
                </Col>
            </Row>
            <CommentForm name={name}   submitForm={addCommentHandler} photo={avatarProfile}/>

            {showComment && commentData[postId].map(c =><Comment key={c.id} toggleLike={toggleLike} avatar={avatar} name={name} postId={postId} c={c}/>)}


        </div>

    );
}