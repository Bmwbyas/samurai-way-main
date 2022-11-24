import React from 'react';
import s from './ProfileUserData.module.css'
import {ContactsType, UserProfileType} from "../../../../Redux/profile-reduser";
import {Contact} from "./Contact/Contact";
import {Button, Row} from "antd";
import {EditOutlined} from '@ant-design/icons';
import {contactIcon} from "./Contact/contactIcon";

type ProfileUserDataPropsType = {
    profile: UserProfileType
    isOwner:boolean
    setEditMode: (value: boolean) => void
}
export const ProfileUserData: React.FC<ProfileUserDataPropsType> = ({profile, setEditMode,isOwner}) => {
    return (
        <div className={s.personalInfoContainer}>

            <Row>
                <div>
                    <div className={s.headline}> User name :
                        <span>
                            {profile.fullName === 'null' ? 'name not found' : profile.fullName}
                        </span>
                    </div>
                </div>
            </Row>
            <Row>
                <div className={s.headline}>About Me :
                    <span>
                        {profile.aboutMe === 'null' ? 'information not found' : profile.aboutMe}
                    </span>
                </div>
            </Row>
            <Row></Row>

            <div style={{marginBottom: 5}}><b>Looking for a
                Job</b> : {profile.lookingForAJob ? 'yes ' : 'no'}</div>
            <div className={s.profileInfo}>
                <b>Skills and
                    experience</b>:<br/> {profile.lookingForAJobDescription === 'null' ? '' : profile.lookingForAJobDescription}
            </div>
            <div>
                <b>contacts</b>:
                <div className={s.contacts}>

                    {(Object.keys(profile.contacts!) as (keyof ContactsType)[])
                        .map((key) => {
                            return <Contact key={key} contactTitle={contactIcon[key]}
                                            contactValue={profile.contacts?.[key]}/>
                        })}</div>
            </div>
            {isOwner&& <Button style={{marginBottom: 15}} type={'primary'} onClick={() => setEditMode(true)}>edit personal
                information <EditOutlined/></Button>}
        </div>
    );
};

