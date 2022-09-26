import React, {ChangeEvent} from 'react';
import './MyPosts.module.css'
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {AddPostFormRedux} from "./AddPostForm";

export const MyPosts = (props: MyPostsPropsType) => {
    const postElement = props.profilePage.postData.map(p =>
        <Post
            key={p.id}
            message={p.message}
            likesCount={p.likesCount}
        />);


    // let addPostHandler = () => {
    //     props.addPost()
    //     // props.dispatch(addPostActionCreator());
    // }
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.updateNewPostText(text)
        // if (text) {
        //     let action = onPostChangeActionCreator(text);
        //     props.dispatch(action)
        // }
    }
    const onAddPost=(formData:any)=>{

        props.addPost(formData.addPost)
    }
    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>

            <div>
                <AddPostFormRedux onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    );
}