import React from 'react';
import './MyPosts.module.css'
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {postDataType} from "../../../Redux/State";


type MyPostsPropsType = {
    postData: postDataType[]
}

export const MyPosts = (props: MyPostsPropsType) => {

    let postElement = props.postData.map(p => <Post message={p.message} likesCount={p.likesCount}/>);
    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>

            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    );
}