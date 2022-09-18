import React from 'react';
import './Profile.module.css'
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {UserProfileType} from "../../Redux/profile-reduser";



type ProfileType={
    profile:UserProfileType|null
    newStatus:string
}

export const Profile:React.FC<ProfileType> = ({profile,newStatus}) => {

    return (
        <div>
            <ProfileInfo profile={profile} newStatus={newStatus}/>
            <MyPostsContainer/>
        </div>
    );
}