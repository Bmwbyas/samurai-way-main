import React from 'react';
import sProfilePage from "../../Profile/Profile.module.css";
import {Divider, Row} from "antd";
import s from "../Users.module.css";
import {SearchUser} from "../../common/SearchUser/SearchUser";
import {PaginationUsers} from "../PaginationUsers/PaginationUsers";
import {User} from "../User/User";
import {UsersDataType} from "../../../Redux/users-reducer";

type ViewUsersType={
    usersData:UsersDataType[]
    changeFriends: (user:UsersDataType)=>void
    followingInProgress:number[]
    getSearchUsers:(term:string)=>void
    totalUsersCount: number
    pageSize: number | undefined
    updateUsersData: (params: { page?: number, count?: number, term?: string }) => void
    currentPage: number | undefined
    isLoading: boolean
    defaultSearchValue: string | null | undefined
}
export const ViewUsers:React.FC<ViewUsersType> = React.memo(({usersData,changeFriends,followingInProgress,
    isLoading,totalUsersCount,getSearchUsers,updateUsersData,defaultSearchValue,
    pageSize,currentPage
}) => {
    console.log('view users')
    const setUsers =  usersData.map((user) => {
        const onClickHandler = () => {
            changeFriends(user)
        }
        return <User key={user.id} user={user} followingInProgress={followingInProgress}
                     onClickHandler={onClickHandler}/>
    })
    return (

        <div className={sProfilePage.profileInfoContainer}>

            <Row>All Users <span className={s.totalCountUsers}>{totalUsersCount}</span> </Row>
            <Divider style={{margin: 10}}/>
            <SearchUser defaultSearchValue={defaultSearchValue} placeholder={'Search users'}
                        getSearchUsers={getSearchUsers} isLoading={isLoading}/>
            <Divider style={{margin: 10}}/>

            {setUsers}
            <PaginationUsers pageSize={pageSize} totalUsersCount={totalUsersCount}
                             updateUsersData={updateUsersData} currentPage={currentPage}/>
        </div>

    );
});
