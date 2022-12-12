import React, {useCallback} from 'react';
import {UsersDataType} from "../../Redux/users-reducer";
import {Col, Row} from "antd";
import {Friends} from "./Friends/Friends";
import {ViewUsers} from "./ViewUsers/ViewUsers";


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
    isOwner: boolean

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
                                                                  isOwner,


                                                              }) => {
    console.log('Users Component render')

    const getSearchUsers = useCallback((term: string) => {
        updateUsersData({term, page: 1, count: 10})
    },[])
    const changeFriends = useCallback((user: UsersDataType) => {
        changeFollowUnfollow(user)
    }, [changeFollowUnfollow])
    const setPaginationParams= useCallback((params: { page?: number, count?: number, term?: string })=>{
        updateUsersData(params)
    },[currentPage,pageSize])

    return (

        <Row style={{marginTop: 20}}>
            <Col className="gutter-row" span={15}>

                <ViewUsers usersData={usersData} changeFriends={changeFriends} followingInProgress={followingInProgress}
                           getSearchUsers={getSearchUsers} totalUsersCount={totalUsersCount} pageSize={pageSize}
                           updateUsersData={setPaginationParams} currentPage={currentPage}
                           isLoading={isLoading} defaultSearchValue={defaultSearchValue}/>

            </Col>
            <Col className="gutter-row" span={9}>

                <Friends isOwner={isOwner} followingInProgress={followingInProgress} friends={friends}
                         changeFriends={changeFriends}/>

            </Col>
        </Row>

    );
});


