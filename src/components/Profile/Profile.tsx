import React, {useState} from 'react';
import s from './Profile.module.css'
import {UserProfileType, UserUpdateProfileType} from "../../Redux/profile-reduser";
import {ProfileStatusWithHooks} from "./ProfileInfo/ProfileStatus/ProfileStatusWithHooks";
import {ProfileUserData} from "./ProfileInfo/ProfileUserData/ProfileUserData";
import {ProfileUserDataForm} from "./ProfileInfo/ProfileUserDataForm/ProfileUserDataForm";
import {Button, Col, Row, Skeleton} from 'antd';
import {UsersDataType} from "../../Redux/users-reducer";
import SingleUser from "../common/SingleUser/SingleUser";
import {PlusCircleOutlined} from "@ant-design/icons";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {NavLink} from "react-router-dom";
import {routes} from "../../Routes/Routes";
import {viewAvatar} from "../../utils/ViewAvatar/viewAvatar";
import {ProfileInfoAvatar} from "./ProfileInfo/ProfileInfoAvatar/ProfileInfoAvatar";

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
    const [sizePortion, setSizePortion] = React.useState(4)
    const totalCountFriends = friends.length
    const friendPortion = friends.slice(0, sizePortion)

    const friendsData=friendPortion.map((f) => {
            const avatar = viewAvatar(f.photos.small)
            return <SingleUser key={f.id} unfriend={changeFollowUnfollow} navigate={routes.toProfile} user={f}
                               photo={avatar} isFriends={true}/>
        })
    const userMayYouKnown=usersUnknown.map((f) => {
        const avatar = viewAvatar(f.photos.small)
        return <SingleUser key={f.id} navigate={routes.toProfile} user={f}
                           photo={avatar} isFriends={false}/>
    })

    const showMoreUser = () => {
        setSizePortion(sizePortion + 4)
    }
    const showButtonMoreFriends = totalCountFriends / sizePortion > 1
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
                <div>
                    <MyPostsContainer/>
                </div>
            </Col>
            <Col className="gutter-row" span={9}>
                <div className={s.profileInfoContainer}>

                    <Row justify={"center"}><h1>Friends</h1></Row>
                    <Row justify={"center"}>

                        <Row>{friendsData}</Row>
                        {showButtonMoreFriends && <Row justify={"end"}>
                            <Button style={{marginBottom: 15}} type={'primary'} onClick={showMoreUser}>Show more
                                friends <PlusCircleOutlined/>
                            </Button>
                        </Row>
                        }
                    </Row>
                </div>
                <div className={s.profileInfoContainer}>
                    <Row justify={"center"}>
                        <NavLink style={{color: "black"}} to={routes.users}>
                            <h1>People may you know</h1>
                        </NavLink>
                    </Row>
                    <Row justify={"start"}>
                        <Row>{userMayYouKnown}</Row>
                    </Row>
                </div>
            </Col>
        </Row>


    )
})

