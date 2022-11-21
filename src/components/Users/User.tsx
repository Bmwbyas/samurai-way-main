import React from 'react';
import s from "./Users.module.css";
import defauleUserPhoto from "../../assets/defaultAvatarUser.png";
import { UsersDataType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";
import {Paginator} from "./Paginator";



type UsersJsxPropsType = {
    user:UsersDataType
    followingInProgress: number[]
        onClickHandler:()=>void
}

export const User:React.FC<UsersJsxPropsType> = ({user,followingInProgress,onClickHandler}) => {


                return (
                    <div key={user.id} className={s.usersContainer}>
                        <div className={s.FollowBlock}>
                            <NavLink to={'/profile/' + user.id}>
                                <img className={s.img}
                                     src={user.photos.small ? user.photos.small : defauleUserPhoto}
                                     alt="img User"/>
                            </NavLink>
                            <button
                                className={s.button}
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick={onClickHandler}
                            >
                                {user.followed ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                        <div className={s.containerUser}>
                            <div>
                                <div>{user.name}</div>
                                <div className={s.description}>{'user.description'}</div>
                            </div>
                            <div className={s.location}>
                                <div>{'user.location.country'}</div>
                                <div>{'user.location.city'}</div>
                            </div>
                        </div>
                    </div>

    );
};


