import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader";
import {UserProfileType, UserUpdateProfileType} from "../../../Redux/profile-reduser";
import {ProfileStatusWithHooks} from "./ProfileStatus/ProfileStatusWithHooks";
import defaultAvatarUser from "./../../../assets/defaultAvatarUser.png"
import {ProfileUserData} from "./ProfileUserData/ProfileUserData";
import {ProfileUserDataForm} from "./ProfileUserDataForm/ProfileUserDataForm";
import {Button, Col, Image, Row} from 'antd';
import {UsersDataType} from "../../../Redux/users-reducer";
import SingleUser from "./SingleUser/SingleUser";
import defaultAvatar from '../../../assets/defaultAvatarUser.png'
import {PlusCircleOutlined} from "@ant-design/icons";
import {MyPostsContainer} from "../MyPosts/MyPostsContainer";
import {NavLink} from "react-router-dom";

type ProfileInfoType = {
    profile: UserProfileType | null
    newStatus: string
    updateProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (value: File) => void
    updateProfileData: (data: UserUpdateProfileType) => void
    friends: UsersDataType[]
    usersUnknown:UsersDataType[]
}

export const ProfileInfo: React.FC<ProfileInfoType> = ({
                                                           profile,
                                                           newStatus,
                                                           updateProfileData,
                                                           savePhoto,
                                                           updateProfileStatus,
                                                           isOwner,
                                                           friends,

                                                           usersUnknown


                                                       }) => {
    const [editMode, setEditMode] = useState(false)
    const [sizePortion,setSizePortion]=React.useState(4)
    if (!profile) {
        return <Preloader/>
    }
    const totalCountFriends=friends.length

    const friendPortion=friends.slice(0,sizePortion)
    const showMoreUser = () => {
        setSizePortion(sizePortion+4)
    }
    const showButtonMoreFriends = totalCountFriends / sizePortion > 1
    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }
    return (

            <Row gutter={5}>
                <Col className="gutter-row" span={15}>

                    <div className={s.profileInfoContainer}>
                        <Row justify={"center"}><h1>Personal Information</h1></Row>
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

                                <div style={{display: "flex", justifyContent: "center"}}>
                                    <Image
                                        rootClassName={s.img}
                                        width={250}
                                        src={profile.photos?.large || defaultAvatarUser}
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
                        <Row justify={"start"}>

                            <Row>{friendPortion.map((f) => {
                                return <SingleUser key={f.id} id={f.id} navigate={'/profile/'} name={f.name}
                                                   photo={f.photos.small ?? defaultAvatar}/>
                            })}</Row>
                            {showButtonMoreFriends && <Row justify={"center"}>
                                <Button style={{marginBottom: 15}} type={'primary'} onClick={showMoreUser}>Show more
                                    friends <PlusCircleOutlined/>
                                </Button>
                            </Row>}
                        </Row>
                    </div>
                    <div className={s.profileInfoContainer}>
                        <Row justify={"center"}>
                            <NavLink style={{color:"black"}} to={'/users'}>
                                <h1>People may you know</h1>
                            </NavLink>
                        </Row>
                        <Row justify={"start"}>
                            <Row>{usersUnknown.map((f) => {
                                return <SingleUser key={f.id} navigate={'/profile/'} id={f.id} name={f.name}
                                                   photo={f.photos.small ?? defaultAvatar}/>
                            })}</Row>
                        </Row>

                    </div>
                </Col>
            </Row>

    )
}

