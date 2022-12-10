import React from 'react';

import sProfilePage from "../Profile/Profile.module.css";
import {Col, Row} from "antd";
import {SearchAutoComplite} from "../common/SearchWithAutocomplite/SearchAutoComplite";
import {FriendsList} from "./FriendsList/FriendsList";
import {DialogLastMessage} from "./DialogLastMessege/DialogLastMessage";
import {NavDialogs} from "./NavDialogs/NavDialogs";
import {UsersDataType} from "../../Redux/users-reducer";
import {TouchedUsers} from "../../Redux/dialogs-reduser";

type DialogsPropsType={
    friends:UsersDataType[]
    myAvatar:string|null|undefined
    tochedUsers:TouchedUsers[]
    addTochedUser:(data: { id: number; name: string; }) => void
    message:string

    removeTochedUser:( id: number) => void
    followingInProgress:number[]
    changeFollowUnfollow:(user:UsersDataType)=>void
    isOwner:boolean
}
export const Dialogs: React.FC<DialogsPropsType> = ({
                                                        friends, myAvatar,
                                                        tochedUsers, addTochedUser, message
                                                        , removeTochedUser,followingInProgress,
                                                        changeFollowUnfollow, isOwner
                                                    }) => {

    console.log('dialogs')
    return (
        <>

            <Row style={{marginTop: 20}}>
                <Col className="gutter-row" span={15}>
                    <div className={sProfilePage.profileInfoContainer}>
                        <SearchAutoComplite data={friends} placeholder={'Find friends dialiog'}
                                            addTochedUser={addTochedUser}/>
                        <FriendsList followingInProgress={followingInProgress} changeFollowUnfollow={changeFollowUnfollow}
                                     isOwner={isOwner} friends={friends} addTochedUser={addTochedUser}/>
                    </div>
                    <div className={sProfilePage.profileInfoContainer}>
                        <DialogLastMessage friends={friends} addTochedUser={addTochedUser}
                                           myAvatar={myAvatar} messege={message}/>
                    </div>
                </Col>
                <Col className="gutter-row" span={9}>
                    <NavDialogs removeTochedUser={removeTochedUser} tochedUsers={tochedUsers}/>
                </Col>
            </Row>
        </>
    );
}