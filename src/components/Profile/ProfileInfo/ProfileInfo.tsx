import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader";
import {UserProfileType} from "../../../Redux/profile-reduser";
import {ProfileStatusWithHooks} from "./ProfileStatus/ProfileStatusWithHooks";
import defaultAvatarUser from "./../../../assets/defaultAvatarUser.png"
import {ProfileUserData} from "./ProfileUserData/ProfileUserData";
import {ProfileUserDataForm} from "./ProfileUserDataForm/ProfileUserDataForm";
import {Col, Image, Row, UploadProps} from 'antd';

type ProfileInfoType = {
    profile: UserProfileType | null
    newStatus: string
    updateProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (value: File) => void
    updateProfileData: (data: UserProfileType) => void
}

export const ProfileInfo: React.FC<ProfileInfoType> = ({
                                                           profile,
                                                           newStatus,
                                                           updateProfileData,
                                                           savePhoto,
                                                           updateProfileStatus,
                                                           isOwner
                                                       }) => {
    const [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader/>
    }
    const props: UploadProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange() {

        },
    };

    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }


    return (
        <div className={s.descriptionBlock}>
            <Row gutter={16}>
                <Col className="gutter-row" span={15}>

                    <div className={s.profileInfoContainer}>
                        <Row justify={"center"} ><h1>Personal Information</h1></Row>
                        <Row>
                            <Col span={12}>
                                <ProfileStatusWithHooks updateProfileStatus={updateProfileStatus}
                                                        newStatus={newStatus}/>
                                {editMode ?
                                    <ProfileUserDataForm profile={profile} updateProfileData={updateProfileData}
                                                         setEditMode={setEditMode}/>
                                    : <ProfileUserData setEditMode={setEditMode} profile={profile}/>}

                            </Col>
                            <Col span={12}>

                                <div style={{ display:"flex", justifyContent: "center"}}>
                                    <Image
                                        rootClassName={s.img}
                                        width={250}
                                        src={profile.photos?.large || defaultAvatarUser}
                                        alt="avatar"
                                    />
                                </div>
                                {/*<img className={s.img} src={profile.photos?.large || defaultAvatarUser}*/}
                                {/*     alt="avatar"/>*/}
                                {isOwner &&
                                    <div style={{display:"flex",justifyContent:"center"}}>
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
                </Col>
                <Col className="gutter-row" span={9}>
                    <div className={s.profileInfoContainer}>
                        dd
                    </div>

                </Col>
            </Row>
        </div>
    )
}

