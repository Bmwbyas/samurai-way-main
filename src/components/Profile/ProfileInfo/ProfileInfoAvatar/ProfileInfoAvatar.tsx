import React from 'react';
import {Image} from "antd";
import s from "../../Profile.module.css";

type ProfileInfoAvatarType={
    avatar:string
    isOwner:boolean
    onMainPhotoSelected:(e: React.ChangeEvent<HTMLInputElement>) =>void
}
export const ProfileInfoAvatar:React.FC<ProfileInfoAvatarType> = ({avatar,isOwner,onMainPhotoSelected}) => {
    return (<>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Image
                rootClassName={s.img}
                width={250}
                src={avatar}
                alt="avatar"
            />
        </div>
    {isOwner &&
    <div style={{display: "flex", justifyContent: "center"}}>
        <label>
            <input type="file" onChange={onMainPhotoSelected}
                   style={{display: 'none'}}/>
            <div className={s.changePhoto}>Change Photo</div>
        </label>
    </div>
    }
    </>
    )

};

