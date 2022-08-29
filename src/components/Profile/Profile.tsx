import React from 'react';
import './Profile.module.css'
import s from './Profile.module.css'

import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {UserProfileType} from "../../Redux/profile-reduser";


type ProfileType={
    profile:UserProfileType|null
}

export const Profile = (props:ProfileType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    );
}