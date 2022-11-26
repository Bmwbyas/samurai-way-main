import React from 'react';
import './Post.module.css'
import s from './Post.module.css'
import defaultAvatar from "../../../../assets/defaultAvatarUser.png";
import {Button, Row} from "antd";

type PostPropsType = {
    message: string
    likesCount: number
    avatarProfile: string | null | undefined
}

export const Post: React.FC<PostPropsType> = ({avatarProfile, message, likesCount}) => {
    const avatar = avatarProfile ?? defaultAvatar
    return (
        <Row>
            <Row>
                <img
                    src={avatar}
                    alt="avatar"
                />
                <Row>
                    name
                </Row>
            </Row>
            <Row>{message}</Row>
            <div>
                <Button>like </Button>{likesCount}
                <Button>message </Button>{likesCount}
            </div>

        </Row>

    );
}