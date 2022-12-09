import React, {useState} from 'react';
import s from "../Profile.module.css";
import {Col, Row} from "antd";
import {ProfileStatusWithHooks} from "./ProfileStatus/ProfileStatusWithHooks";
import {ProfileUserDataForm} from "./ProfileUserDataForm/ProfileUserDataForm";
import {ProfileUserData} from "./ProfileUserData/ProfileUserData";
import {ProfileInfoAvatar} from "./ProfileInfoAvatar/ProfileInfoAvatar";
import {viewAvatar} from "../../../utils/ViewAvatar/viewAvatar";
import {UserProfileType, UserUpdateProfileType} from "../../../Redux/profile-reduser";

type ProfileInfoType={
    profile: UserProfileType
    newStatus: string
    updateProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (value: File) => void
    updateProfileData: (data: UserUpdateProfileType) => void
}
export const ProfileInfo:React.FC<ProfileInfoType> = ({newStatus,
                                                          updateProfileData,
                                                          savePhoto,
                                                          updateProfileStatus,
                                                          isOwner,profile}) => {
    const [editMode, setEditMode] = useState(false)
    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const avatar = viewAvatar(profile.photos.large)

    return (
        <div className={s.profileInfoContainer}>
            <Row justify={"center"}>
                <h1>Personal Information</h1>
            </Row>

            <Row>
                <Col span={12}>
                    <ProfileStatusWithHooks updateProfileStatus={updateProfileStatus}
                                            newStatus={newStatus}/>
                    {editMode ?
                        <ProfileUserDataForm profile={profile} updateProfileData={updateProfileData}
                                             setEditMode={setEditMode}/>
                        : <ProfileUserData setEditMode={setEditMode} isOwner={isOwner} profile={profile}/>}
                </Col>

                <Col span={12}>
                    <ProfileInfoAvatar avatar={avatar} isOwner={isOwner}
                                       onMainPhotoSelected={onMainPhotoSelected}/>
                </Col>
            </Row>
        </div>
    );
};

