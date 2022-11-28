import React from 'react';
import './Profile.module.css'
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {UserProfileType, UserUpdateProfileType} from "../../Redux/profile-reduser";
import {UsersDataType} from "../../Redux/users-reducer";


type ProfileType={
    profile:UserProfileType|null
    newStatus:string
    updateProfileStatus: (status: string) => void
    isOwner:boolean
    updateProfileData:(data:UserUpdateProfileType)=>void
    savePhoto:(value:File)=>void
    friends:UsersDataType[]
    friendsPagination:{
        pageSize:number
        currentPage:number
        totalUsersCount:number
    }
    setMoreFriends:()=>void
    usersUnknown:UsersDataType[]
}

export const Profile:React.FC<ProfileType> = ({profile,newStatus,usersUnknown,setMoreFriends,friendsPagination,updateProfileData,savePhoto,updateProfileStatus,isOwner,friends}) => {

    return (
        <div className={s.pofileContainer}>
            <ProfileInfo  usersUnknown={usersUnknown} profile={profile} friendsPagination={friendsPagination} setMoreFriends={setMoreFriends} friends={friends} updateProfileData={updateProfileData} newStatus={newStatus} isOwner={isOwner} savePhoto={savePhoto}    updateProfileStatus={updateProfileStatus}/>

        </div>
    );
}