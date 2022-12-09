import React, {useState} from 'react';
import s from './Profile.module.css'
import {UserProfileType, UserUpdateProfileType} from "../../Redux/profile-reduser";
import {ProfileStatusWithHooks} from "./ProfileInfo/ProfileStatus/ProfileStatusWithHooks";
import {ProfileUserData} from "./ProfileInfo/ProfileUserData/ProfileUserData";
import {ProfileUserDataForm} from "./ProfileInfo/ProfileUserDataForm/ProfileUserDataForm";
import {Col, Row, Skeleton} from 'antd';
import {UsersDataType} from "../../Redux/users-reducer";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {viewAvatar} from "../../utils/ViewAvatar/viewAvatar";
import {ProfileInfoAvatar} from "./ProfileInfo/ProfileInfoAvatar/ProfileInfoAvatar";
import {PeopleUnknown} from "./PeopleUnknown/PeopleUnknown";
import {FriendsListProfile} from "./FriendsProfile/FriendsListProfile";


type ProfileType = {
    profile: UserProfileType | null
    newStatus: string
    updateProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (value: File) => void
    updateProfileData: (data: UserUpdateProfileType) => void
    friends: UsersDataType[]
    usersUnknown: UsersDataType[]
    changeFollowUnfollow:(user:UsersDataType)=>void
}

export const Profile: React.FC<ProfileType> = React.memo(({
                                                       profile,
                                                       newStatus,
                                                       updateProfileData,
                                                       savePhoto,
                                                       updateProfileStatus,
                                                       isOwner,
                                                       friends,
                                                       usersUnknown,
                                                   changeFollowUnfollow
                                                   }) => {
    console.log('profile component')
    const [editMode, setEditMode] = useState(false)


    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }


    if (!profile) {
        return <Skeleton loading={!profile}/>
    }
    const avatar = viewAvatar(profile.photos.large)
    return (

    <Row gutter={5}>
            <Col className="gutter-row" span={15}>

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
                    <MyPostsContainer/>

            </Col>
            <Col className="gutter-row" span={9}>
                <FriendsListProfile friends={friends} changeFollowUnfollow={changeFollowUnfollow}/>
                <PeopleUnknown usersUnknown={usersUnknown}/>
            </Col>
        </Row>


    )
})

