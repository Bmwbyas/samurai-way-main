import React from 'react';
import './Profile.module.css'
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {UserProfileType} from "../../Redux/profile-reduser";



type ProfileType={
    profile:UserProfileType|null
    newStatus:string
    updateProfileStatus: (status: string) => void
}

export const Profile:React.FC<ProfileType> = ({profile,newStatus,updateProfileStatus}) => {

    return (
        <div>
            <ProfileInfo profile={profile} newStatus={newStatus}     updateProfileStatus={updateProfileStatus}/>
            <MyPostsContainer/>
        </div>
    );
}