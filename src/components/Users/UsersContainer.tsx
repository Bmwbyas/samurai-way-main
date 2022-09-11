import React from 'react';
import {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import {
    changeFollow,
    setCurrentPage, setFollowingInProgress,
    setIsFetching,
    setTotalCount,
    setUsers,
    UsersPageStateType
} from "../../Redux/users-reducer";
import UsersJsx from "./UsersJSX";
import {Preloader} from "../common/Preloader";
import {usersAPI} from "../../api/api";

class UsersContainerWithAPI extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.setIsFetching(true)
        usersAPI.getUsers(this.props.currentPage,this.props.pageSize)
            .then(data => {
            this.props.setUsers(data.items)
            this.props.setTotalCount(data.totalCount)
            this.props.setIsFetching(false)
        });
    }

    setCurrentPages = (pageNumber: number) => {
        this.props.setIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        usersAPI.getUsers(pageNumber,this.props.pageSize)
            .then(data => {
                this.props.setUsers(data.items)
                this.props.setIsFetching(false)
            });
    }

    render() {
        return (
            <>

                {this.props.isFetching
                    ? <Preloader/>
                    : null}
                <UsersJsx
                    key={this.props.totalUsersCount}
                    usersData={this.props.usersPage.usersData}
                    setCurrentPage={this.setCurrentPages}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    changeFollowed={this.props.changeFollow}
                    totalUsersCount={this.props.totalUsersCount}
                    followingInProgress={this.props.followingInProgress}
                    setFollowingInProgress={this.props.setFollowingInProgress}
                />
            </>
        );
    }
}

type MapStateToPropsType = {
    usersPage: UsersPageStateType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress:number[]
}
// type MapDispatchToPropsType = {
//     changeFollow: (userID: number) => void
//     setUsers: (users: UsersDataType[]) => void
//     setCurrentPage: (currentPage: number) => void
//     setTotalUsersCount: (totalCount: number) => void
//     setIsFetching: (isFetching: boolean) => void
// }
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType
type MapDispatchToPropsType = typeof mapDispatchToProps
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress:state.usersPage.followingInProgress
    }
}

const mapDispatchToProps = {
    changeFollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    setIsFetching,
    setFollowingInProgress
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainerWithAPI)

