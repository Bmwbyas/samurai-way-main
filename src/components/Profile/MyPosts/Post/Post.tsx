import React from 'react';
import './Post.module.css'
import {LikeOutlined,MessageOutlined} from '@ant-design/icons';
import defaultAvatar from "../../../../assets/defaultAvatarUser.png";
import {Button, Col, Row, Statistic} from "antd";
import style from "../../ProfileInfo/ProfileInfo.module.css";
import styleMyPosts from "../MyPosts.module.css";
import s from './Post.module.css'
import {CommentForm} from "../CommentForm/CommentForm";

type PostPropsType = {
    message: string
    likesCount: number
    avatarProfile: string | null | undefined
    name: string
}

export const Post: React.FC<PostPropsType> = ({avatarProfile, message, likesCount, name}) => {
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
            <Row>
                <Col>
                    <Button type="ghost" ghost>
                        <LikeOutlined /> <span>{likesCount}</span>
                    </Button>
                </Col>
                <Col>
                    <Button type="ghost" ghost>
                        <MessageOutlined /> Comment
                    </Button>
                </Col>
            </Row>

                <CommentForm name={name} addComment={(v:string)=>{}} photo={avatarProfile} />


        </div>

    );
}