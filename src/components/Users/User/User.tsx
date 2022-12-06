import React, {forwardRef} from 'react';
import s from "./User.module.css";
import {UsersDataType} from "../../../Redux/users-reducer";
import {NavLink} from "react-router-dom";
import {viewAvatar} from "../../../utils/ViewAvatar/viewAvatar";
import {Button, Col, Divider, Row} from "antd";
import {routes} from "../../../Routes/Routes";


type UsersPropsType = {
    user: UsersDataType
    followingInProgress: number[]
    onClickHandler: () => void
}

export const User =React.memo( forwardRef<any, UsersPropsType>(({user, followingInProgress, onClickHandler}, ref) => {

    const avatar = viewAvatar(user.photos.small)
    return (
        <div key={user.id} ref={ref} className={s.usersContainer}>
            <Row gutter={10} align={"middle"} justify={"space-between"}>

                    <Col>
                        <NavLink to={routes.toProfile + user.id}>
                        <img className={s.avatar}
                             src={avatar}
                             alt="img User"/>
                        </NavLink>
                    </Col>
                    <Col>
                        <Row>
                            <NavLink to={routes.toProfile + user.id}>
                                <span className={s.name}>{user.name}</span>
                            </NavLink>
                        </Row>

                    </Col>

                <Col> <Button
                    type={"default"}
                    className={s.button}
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={onClickHandler}
                >
                    {user.followed ? 'Unfriend' : 'Add Friend'}
                </Button></Col>

            </Row>
            <Divider style={{margin: 10}}/>
        </div>

    );
}));


