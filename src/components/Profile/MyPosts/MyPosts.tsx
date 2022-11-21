import React, {memo} from 'react';
import './MyPosts.module.css'
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {AddPostForm} from "./AddPostForm";


export const MyPosts=memo((props: MyPostsPropsType)=> {
    console.log(props)

    const postElement = props.profilePage.postData.map(p =>
        <Post
            key={p.id}
            message={p.message}
            likesCount={p.likesCount}
        />);


    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>

            <div>
                <AddPostForm addPost={props.addPost}/>
            </div>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    );
})