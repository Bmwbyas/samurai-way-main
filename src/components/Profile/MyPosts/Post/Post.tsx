import React from 'react';
import './Post.module.css'
import s from './Post.module.css'
import defaultAvatar from "../../../../assets/defaultAvatarUser.png";
type PostPropsType={
    message:string
    likesCount:number
    avatarProfile:string | null | undefined
}

export const Post:React.FC<PostPropsType> = ({avatarProfile,message,likesCount}) => {
    const avatar = avatarProfile ?? defaultAvatar
    return (
        <div className={s.item}>
            <img
                src={avatar}
                alt="avatar"/>
            {message}
            <div>
                <span>like </span>{likesCount}
            </div>

        </div>

    );
}