import React from 'react';
import s from "./Users.module.css";
import {UsersDataType} from "../../Redux/users-reducer";
import {Paginator} from "./Paginator";
import {User} from "./User";


type UsersJsxPropsType = {
    totalUsersCount: number
    pageSize: number
    setCurrentPage: (p: number) => void
    currentPage: number
    usersData: UsersDataType[]
    followingInProgress: number[]
    changeFollowUnfollow: any
}

const UsersJsx: React.FC<UsersJsxPropsType> = ({
                                                   usersData,
                                                   totalUsersCount,
                                                   pageSize,
                                                   currentPage,
                                                   setCurrentPage,
                                                   changeFollowUnfollow,
                                                   followingInProgress
                                               }) => {

    return (
        <div className={s.Users}>
            <Paginator portionSize={10}
                pageSize={pageSize} totalItemsCount={totalUsersCount}
                currentPage={currentPage} setCurrentPage={setCurrentPage}
            />

            {usersData.map(user => {
                const onClickHandler = () => {
                    changeFollowUnfollow(user)
                }

                return (
                    <User key={user.id} user={user} followingInProgress={followingInProgress}
                          onClickHandler={onClickHandler}/>
                )
            })}
        </div>
    );
};

export default UsersJsx;
