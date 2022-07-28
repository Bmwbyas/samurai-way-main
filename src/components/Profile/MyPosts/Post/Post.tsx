import React from 'react';
import './Post.module.css'
import s from './Post.module.css'
type PostPropsType={
    message:string
    likesCount:number
}

export const Post = (props:PostPropsType) => {
    return (
        <div className={s.item}>
            <img
                src="https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/ee5d54ff-e5b4-443d-a392-604c61c298c6/300x450"
                alt="imgAvatar"/>
            {props.message}
            <div>
                <span>like </span>{props.likesCount}
            </div>

        </div>

    );
}