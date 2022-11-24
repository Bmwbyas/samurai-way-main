import React from 'react';
import './Profile.module.css'
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {UserProfileType, UserUpdateProfileType} from "../../Redux/profile-reduser";



type ProfileType={
    profile:UserProfileType|null
    newStatus:string
    updateProfileStatus: (status: string) => void
    isOwner:boolean
    updateProfileData:(data:UserUpdateProfileType)=>void
    savePhoto:(value:File)=>void


}

export const Profile:React.FC<ProfileType> = ({profile,newStatus,updateProfileData,savePhoto,updateProfileStatus,isOwner}) => {

    return (
        <div className={s.pofileContainer}>
            <ProfileInfo profile={profile}  updateProfileData={updateProfileData} newStatus={newStatus} isOwner={isOwner} savePhoto={savePhoto}    updateProfileStatus={updateProfileStatus}/>
            <MyPostsContainer/>
        </div>
    );
}