import React from 'react';
import {UserProfileType, UserUpdateProfileType} from "../../Redux/profile-reduser";
import {Col, Row, Skeleton} from 'antd';
import {UsersDataType} from "../../Redux/users-reducer";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {PeopleUnknown} from "./PeopleUnknown/PeopleUnknown";
import {FriendsListProfile} from "./FriendsProfile/FriendsListProfile";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

type ProfileType = {
    profile: UserProfileType | null
    newStatus: string
    updateProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (value: File) => void
    updateProfileData: (data: UserUpdateProfileType) => void
    friends: UsersDataType[]
    usersUnknown: UsersDataType[]
    changeFollowUnfollow: (user: UsersDataType) => void
}

export const Profile: React.FC<ProfileType> = ({
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

    if (!profile) {
        return <Skeleton loading={!profile}/>
    }

    return (

        <Row gutter={5}>
            <Col className="gutter-row" span={15}>
                <ProfileInfo profile={profile} updateProfileData={updateProfileData} updateProfileStatus={updateProfileStatus}
                newStatus={newStatus} isOwner={isOwner} savePhoto={savePhoto}/>
                <MyPostsContainer/>

            </Col>
            <Col className="gutter-row" span={9}>
                <FriendsListProfile friends={friends} changeFollowUnfollow={changeFollowUnfollow} isOwner={isOwner}/>
                <PeopleUnknown usersUnknown={usersUnknown}/>
            </Col>
        </Row>


    )
}

