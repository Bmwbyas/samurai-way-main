import React from 'react';
import s from "./Users.module.css";
import {UsersDataType} from "../../Redux/users-reducer";
import {User} from "./User/User";
import sProfilePage from "../Profile/ProfileInfo/ProfileInfo.module.css";
import {Col, Divider, Pagination, Row} from "antd";
import {SearchUser} from "../common/SearchUser/SearchUser";


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


                                                              }) => {
    console.log('Users Component render')
    const onChangePaginationValue = (page: number, pageSize: number) => updateUsersData({page, count: pageSize})
    const getSearchUsers = (term: string) => {
        updateUsersData({term, page: 1, count: 10})
    }
    const setUsers = usersData.map((user) => {
        const onClickHandler = () => {
            changeFollowUnfollow(user)
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
                        <Row>hhh</Row>
                    </div>
                </Col>
            </Row>

    );
});


