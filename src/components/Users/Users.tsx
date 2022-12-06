import React, {useCallback} from 'react';
import s from "./Users.module.css";
import {UsersDataType} from "../../Redux/users-reducer";
import {User} from "./User/User";
import sProfilePage from "../Profile/ProfileInfo/ProfileInfo.module.css";
import {Col, Divider, Pagination, Row} from "antd";
import {SearchUser} from "../common/SearchUser/SearchUser";
import {viewAvatar} from "../../utils/ViewAvatar/viewAvatar";
import SingleUser from "../common/SingleUser/SingleUser";
import {routes} from "../../Routes/Routes";


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
                                                                  friends

                                                              }) => {
    console.log('Users Component render')
    const onChangePaginationValue = (page: number, pageSize: number) => updateUsersData({page, count: pageSize})
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
    const pageSizeOptions = () => {

        if (pageSize) {
            return [pageSize, pageSize * 2, pageSize * 3, pageSize * 4, pageSize * 10]
        } else {
            return [10, 20, 30, 40]
        }

    }
    const friendsData = friends.map((f) => {
        const avatar = viewAvatar(f.photos.small)
        return <SingleUser key={f.id}  unfriend={changeFriends} user={f} navigate={routes.toProfile}  photo={avatar}/>
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
                        <Pagination defaultCurrent={currentPage} onChange={onChangePaginationValue}
                                    hideOnSinglePage={true}
                                    showTitle={false}
                                    defaultPageSize={pageSize} total={totalUsersCount}
                                    pageSizeOptions={pageSizeOptions()}/>
                    </div>
                </Col>
                <Col className="gutter-row" span={9}>
                    <div className={sProfilePage.profileInfoContainer}>
                        <Row>My friends {friends.length+1}</Row>
                        <Row>{friendsData}</Row>
                    </div>
                </Col>
            </Row>

    );
});


