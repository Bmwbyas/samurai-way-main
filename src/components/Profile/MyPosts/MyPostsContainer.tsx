import React  from 'react';
import './MyPosts.module.css'


import { StoreType} from "../../../Redux/Store";
import {addPostActionCreator, onPostChangeActionCreator} from "../../../Redux/profile-reduser";
import {MyPosts} from "./MyPosts";

type MyPostsPropsType = {
    // postData: postDataType[]
    // addPost:()=>void
    // updateNewPostsText:(newText:string)=>void
    // newPostText: string
    //
    // dispatch: (action: any) => void
    store:StoreType
}

export const MyPostsContainer = (props: MyPostsPropsType) => {

    let addPostHandler = () => {
        // props.addPost()
        props.store.dispatch(addPostActionCreator());
    }
    let onPostChange = (text:string) => {
            let action = onPostChangeActionCreator(text);
            props.store.dispatch(action)
    }
    return (
        <MyPosts
            postData={props.store._state.profilePage.postData}
            addPost={addPostHandler}
            updateNewPostText={onPostChange}

         newPostText={props.store._state.profilePage.newPostText}/>
    );
}