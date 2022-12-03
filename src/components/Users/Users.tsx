import React from 'react';
import s from "./Users.module.css";
import {UsersDataType} from "../../Redux/users-reducer";
import {User} from "./User/User";
import sProfilePage from "../Profile/ProfileInfo/ProfileInfo.module.css";
import {Col, Divider, Row} from "antd";
import {SearchUser} from "../common/SearchUser/SearchUser";


type UsersJsxPropsType = {
    totalUsersCount: number
    pageSize: number
    setCurrentPage: (p: number) => void
    currentPage: number
    usersData: UsersDataType[]

    followingInProgress: number[]
    changeFollowUnfollow: any
    getSearchUsers: (term:string)=>void
    isLoading:boolean
}

const Users: React.FC<UsersJsxPropsType> = ({
                                                usersData,
                                                totalUsersCount,
                                                pageSize,
                                                currentPage,
                                                setCurrentPage,
                                                changeFollowUnfollow,
                                                followingInProgress,
                                                getSearchUsers,
                                                isLoading
                                            }) => {

    return (

        <Row  style={{marginTop: 20}}>
            <Col className="gutter-row" span={15}>
                <div className={sProfilePage.profileInfoContainer}>
                    {/*<Paginator portionSize={10}*/}
                    {/*           pageSize={pageSize} totalItemsCount={totalUsersCount}*/}
                    {/*           currentPage={currentPage} setCurrentPage={setCurrentPage}*/}
                    {/*/>*/}
                    <Row >All Users   <span className={s.totalCountUsers}>{totalUsersCount}</span> </Row>
                    <Divider style={{margin: 10}}/>
                    <SearchUser getSearchUsers={getSearchUsers} isLoading={isLoading}/>
                    <Divider style={{margin: 10}}/>

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
            </Col>
            <Col className="gutter-row" span={9}>
                <div className={sProfilePage.profileInfoContainer}>
                    <Row>hhh</Row>
                </div>
            </Col>
        </Row>

    );
};

export default Users;
