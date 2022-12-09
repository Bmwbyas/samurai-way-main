import React from 'react';
import s from "../Profile.module.css";
import {Row} from "antd";
import {NavLink} from "react-router-dom";
import {routes} from "../../../Routes/Routes";
import {viewAvatar} from "../../../utils/ViewAvatar/viewAvatar";
import SingleUser from "../../common/SingleUser/SingleUser";
import {UsersDataType} from "../../../Redux/users-reducer";

type PeopleUnknownPropsType={
    usersUnknown:UsersDataType[]
}
export const PeopleUnknown:React.FC<PeopleUnknownPropsType> = ({usersUnknown}) => {
    const userMayYouKnown=usersUnknown.map((f) => {
        const avatar = viewAvatar(f.photos.small)
        return <SingleUser key={f.id} navigate={routes.toProfile} user={f}
                           photo={avatar} isFriends={false}/>
    })
    return (
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
    );
};

