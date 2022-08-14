import React, {ChangeEvent} from 'react';
import './MyPosts.module.css'
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {profilePageType} from "../../../Redux/redux-store";


type MyPostsPropsType = {
    profilePage: profilePageType
    addPost: () => void
    updateNewPostText: (newText: string) => void


    // dispatch: (action: any) => void
}


export const MyPosts = (props: MyPostsPropsType) => {

    const postElement = props.profilePage.postData.map(p => <Post key={p.id} message={p.message}
                                                                  likesCount={p.likesCount}/>);


    let addPostHandler = () => {
        props.addPost()
        // props.dispatch(addPostActionCreator());
    }
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.updateNewPostText(text)
        // if (text) {
        //     let action = onPostChangeActionCreator(text);
        //     props.dispatch(action)
        // }
    }
    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>

            <div>
                <div>
                    <textarea
                        placeholder='Add new post'
                        onChange={onPostChange}
                        value={props.profilePage.newPostText}
                    />
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