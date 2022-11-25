import React, {memo} from 'react';
import './MyPosts.module.css'
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {AddPostForm} from "./AddPostForm/AddPostForm";


export const MyPosts=memo((props: MyPostsPropsType)=> {


    const postElement = props.profilePage.postData.map(p =>
        <Post
            key={p.id}
            message={p.message}
            likesCount={p.likesCount}
        />);


    return (
        <div className={s.postsBlock}>
            <div>

                <AddPostForm photo={props.profilePage.profile?.photos.small} name={props.profilePage.profile?.fullName} addPost={props.addPost}/>
            </div>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    );
})