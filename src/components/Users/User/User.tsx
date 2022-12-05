import React, {forwardRef} from 'react';
import s from "./User.module.css";
import {UsersDataType} from "../../../Redux/users-reducer";
import {NavLink} from "react-router-dom";
import {viewAvatar} from "../../../utils/ViewAvatar/viewAvatar";
import {Button, Col, Divider, Row} from "antd";
import {routes} from "../../../Routes/Routes";


type UsersJsxPropsType = {
    user: UsersDataType
    followingInProgress: number[]
    onClickHandler: () => void
}

export const User = forwardRef<any,UsersJsxPropsType> (({user, followingInProgress, onClickHandler},ref) => {

    const avatar = viewAvatar(user.photos.small)
    return (
        <div key={user.id} ref={ref} className={s.usersContainer}>
            <Row gutter={10}>
                <Col>
                    <NavLink to={routes.toProfile + user.id}>
                        <img className={s.avatar}
                             src={avatar}
                             alt="img User"/>
                    </NavLink>
                </Col>
                <Col>
                    <Row><NavLink to={routes.toProfile + user.id}>
                        <span className={s.name}>{user.name}</span>
                    </NavLink></Row>
                   <Row> <Button
                        type={"default"}
                        className={s.button}
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={onClickHandler}
                    >
                        {user.followed ? 'Unfriend' : 'Add Friend'}
                    </Button></Row>
                </Col>

            </Row>
            <Divider style={{margin: 10}}/>
        </div>

    );
});


