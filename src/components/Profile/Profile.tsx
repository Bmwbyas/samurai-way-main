import React from 'react';
import './Profile.module.css'
 import s from './Profile.module.css'

import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import { StoreType} from "../../Redux/Store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";


type ProfilePropsType={
    store:StoreType
    // profilePage:profilePageType
    // addPost:()=>void
    // updateNewPostsText:(newText:string)=>void
    // dispatch:(action:any)=>void
}

export const Profile = (props:ProfilePropsType) => {
    return (
        <div>

            <ProfileInfo/>
            <MyPostsContainer
                store={props.store}
            />
        </div>
    );
}