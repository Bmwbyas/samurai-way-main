import React, {ChangeEvent} from 'react';
import './MyPosts.module.css'
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {addPostActionCreator, onPostChangeActionCreator, postDataType} from "../../../Redux/State";

type MyPostsPropsType = {
    postData: postDataType[]
    // addPost:()=>void
    // updateNewPostsText:(newText:string)=>void
    newPostText: string

    dispatch: (action: any) => void
}




export const MyPosts = (props: MyPostsPropsType) => {

    const postElement = props.postData.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);



    let addPostHandler = () => {
        props.dispatch(addPostActionCreator());
    }
    let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        if (text) {
            let action = onPostChangeActionCreator(text);
            props.dispatch(action)
        }
    }
    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>

            <div>
                <div>
                    <textarea placeholder='Add new post' onChange={onPostChange} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPostHandler}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    );
}