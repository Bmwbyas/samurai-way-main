import React from 'react';
import './Profile.module.css'
// import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {profilePageType} from "../../Redux/State";


type ProfilePropsType={
    profilePage:profilePageType
    // addPost:()=>void
    // updateNewPostsText:(newText:string)=>void
    dispatch:(action:any)=>void
}

export const Profile = (props:ProfilePropsType) => {
    return (
        <div>

            <ProfileInfo/>
            <MyPosts
                postData={props.profilePage.postData}
                dispatch={props.dispatch}
                newPostText={props.profilePage.newPostText}
            />
        </div>
    );
}