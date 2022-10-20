import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader";
import {UserProfileType} from "../../../Redux/profile-reduser";
import {ProfileStatus} from "./ProfileStatus";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

type ProfileInfoType = {
    profile: UserProfileType | null
    newStatus: string
    updateProfileStatus: (status: string) => void
}


export const ProfileInfo: React.FC<ProfileInfoType> = ({profile, newStatus, updateProfileStatus}) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <>
            <div>
                <img className={s.img}
                     src="https://bipbap.ru/wp-content/uploads/2017/04/priroda_kartinki_foto_03.jpg"
                     alt="image Icon"/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large} alt=""/>
                <div>FullName: {profile.fullName}</div>
                <div>Looking for a Job : {profile.lookingForAJob ? 'yes' : 'no no no'}</div>
                <div>description: {profile.lookingForAJobDescription}</div>
                <div>contacts: {profile.contacts.facebook}</div>
                {/*<ProfileStatus updateProfileStatus={updateProfileStatus} newStatus={newStatus}/>*/}
                <ProfileStatusWithHooks updateProfileStatus={updateProfileStatus} newStatus={newStatus}/>
            </div>
        </>
    )

}