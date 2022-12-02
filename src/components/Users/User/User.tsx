import React from 'react';
import s from "./User.module.css";
import {UsersDataType} from "../../../Redux/users-reducer";
import {NavLink} from "react-router-dom";
import {viewAvatar} from "../../../utils/ViewAvatar/viewAvatar";
import {Button, Col, Divider, Row} from "antd";


type UsersJsxPropsType = {
    user: UsersDataType
    followingInProgress: number[]
    onClickHandler: () => void
}

export const User: React.FC<UsersJsxPropsType> = ({user, followingInProgress, onClickHandler}) => {

    const avatar = viewAvatar(user.photos.small)
    return (
        <div key={user.id} className={s.usersContainer}>
            <Row gutter={10}>
                <Col>
                    <NavLink to={'/profile/' + user.id}>
                        <img className={s.avatar}
                             src={avatar}
                             alt="img User"/>
                    </NavLink>
                </Col>
                <Col>
                    <Row><NavLink to={'/profile/' + user.id}>
                        <span className={s.name}>{user.name}</span>
                    </NavLink></Row>
                   <Row> <Button
                        type={"default"}
                        className={s.button}
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={onClickHandler}
                    >
                        {user.followed ? 'Unfollow' : 'Add Friend'}
                    </Button></Row>
                </Col>
                <Col>
                    About me {user.uniqueUrlName}
                </Col>

            </Row>
            <Divider style={{margin: 10}}/>
        </div>

    );
};


