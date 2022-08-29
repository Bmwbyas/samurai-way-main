import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader";
import {UserProfileType} from "../../../Redux/profile-reduser";
type ProfileInfoType={
    profile:UserProfileType|null
}


export const ProfileInfo = (props:ProfileInfoType) => {
    if (!props.profile){
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
                <img src={props.profile.photos.large} alt=""/>
                <div>FullName: {props.profile.fullName}</div>
                <div>Looking for a Job : {props.profile.lookingForAJob?'yes':'no no no'}</div>
                <div>description: {props.profile.lookingForAJobDescription}</div>
                <div>contacts: {props.profile.contacts.facebook}</div>

            </div>
        </>
    )

}