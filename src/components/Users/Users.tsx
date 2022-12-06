import React from 'react';
import s from "./Users.module.css";
import {UsersDataType} from "../../Redux/users-reducer";
import {User} from "./User/User";
import sProfilePage from "../Profile/ProfileInfo/ProfileInfo.module.css";
import {Col, Divider, Pagination, Row} from "antd";
import {SearchUser} from "../common/SearchUser/SearchUser";


type UsersJsxPropsType = {
    totalUsersCount: number
    pageSize: number
    setPaginationValue: (params: { page?: number, count?: number, term?: string }) => void
    currentPage: number
    usersData: UsersDataType[]
    followingInProgress: number[]
    changeFollowUnfollow: any
    isLoading: boolean
    defaultSearchValue:string|null|undefined
    // getUsers: (params:GetUsersParamsType) => void
    // updateUsersParams:(params:GetUsersParamsType)=>void
    // getUsersParams:GetUsersParamsType
    // getSearchUsers: (term: string) => void
}

export const Users: React.FC<UsersJsxPropsType> = React.memo( ({
                                                usersData,
                                                totalUsersCount,
                                                pageSize,
                                                currentPage,
                                                setPaginationValue,
                                                changeFollowUnfollow,
                                                followingInProgress,
                                                // getSearchUsers,
                                                isLoading,
                                                defaultSearchValue

                                            }) => {
     console.log('Users Component render')
    const onChangePaginationValue = (page: number, pageSize: number) => setPaginationValue({page, count: pageSize})
    const getSearchUsers=(term:string)=>{
        setPaginationValue({term,page:1,count:10})
    }
    const setUsers = usersData.map((user) => {
        const onClickHandler = () => {
            changeFollowUnfollow(user)
        }
        return <User key={user.id} user={user} followingInProgress={followingInProgress}
                     onClickHandler={onClickHandler}/>
    })

    return (

        <Row style={{marginTop: 20}}>
            <Col className="gutter-row" span={15}>
                <div className={sProfilePage.profileInfoContainer}>

                    <Row>All Users <span className={s.totalCountUsers}>{totalUsersCount}</span> </Row>
                    <Divider style={{margin: 10}}/>
                    <SearchUser defaultSearchValue={defaultSearchValue} getSearchUsers={getSearchUsers} isLoading={isLoading}/>
                    <Divider style={{margin: 10}}/>

                    {setUsers}
                    <Pagination defaultCurrent={currentPage} onChange={onChangePaginationValue}
                                defaultPageSize={pageSize} total={totalUsersCount}/>
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


