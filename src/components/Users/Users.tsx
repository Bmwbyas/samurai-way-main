import React, {useCallback} from 'react';
import s from "./Users.module.css";
import {UsersDataType} from "../../Redux/users-reducer";
import {User} from "./User/User";
import sProfilePage from "../Profile/Profile.module.css";
import {Col, Divider, Row} from "antd";
import {SearchUser} from "../common/SearchUser/SearchUser";
import {Friends} from "./Friends/Friends";
import {PaginationUsers} from "./PaginationUsers/PaginationUsers";


type UsersJsxPropsType = {
    totalUsersCount: number
    pageSize: number | undefined
    updateUsersData: (params: { page?: number, count?: number, term?: string }) => void
    currentPage: number | undefined
    usersData: UsersDataType[]
    followingInProgress: number[]
    changeFollowUnfollow: any
    isLoading: boolean
    defaultSearchValue: string | null | undefined
    friends: UsersDataType[]
    isOwner:boolean
}

export const Users: React.FC<UsersJsxPropsType> = React.memo(({
                                                                  usersData,
                                                                  totalUsersCount,
                                                                  pageSize,
                                                                  currentPage,
                                                                  updateUsersData,
                                                                  changeFollowUnfollow,
                                                                  followingInProgress,
                                                                  isLoading,
                                                                  defaultSearchValue,
                                                                  friends,
                                                                  isOwner

                                                              }) => {
    console.log('Users Component render')

    const getSearchUsers = (term: string) => {
        updateUsersData({term, page: 1, count: 10})
    }
    const changeFriends=useCallback((user:UsersDataType)=>{
        changeFollowUnfollow(user)
    },[friends])
    const setUsers =  usersData.map((user) => {
        const onClickHandler = () => {
            changeFriends(user)
        }
        return <User key={user.id} user={user} followingInProgress={followingInProgress}
                     onClickHandler={onClickHandler}/>
    })

    return (

            <Row style={{marginTop: 20}} >
                <Col className="gutter-row" span={15}>
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
                </Col>
                <Col className="gutter-row" span={9}>
                   <Friends isOwner={isOwner} friends={friends} changeFriends={changeFriends}/>
                </Col>
            </Row>

    );
});


