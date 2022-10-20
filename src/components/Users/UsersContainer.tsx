import React from 'react';
import {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import {
    changeFollow,
    changeFollowUnfollow,
    getUsers,
    setFollowingInProgress,
    UsersDataType
} from "../../Redux/users-reducer";
import UsersJsx from "./UsersJSX";
import {Preloader} from "../common/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSuperSelector
} from "../../Redux/usersSelectors";


class UsersContainerWithAPI extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    setCurrentPages = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return (
            <>

                {this.props.isFetching
                    ? <Preloader/>
                    : null}
                <UsersJsx
                    key={this.props.totalUsersCount}
                    usersData={this.props.usersData}
                    setCurrentPage={this.setCurrentPages}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    changeFollowed={this.props.changeFollow}
                    totalUsersCount={this.props.totalUsersCount}
                    followingInProgress={this.props.followingInProgress}
                    changeFollowUnfollow={this.props.changeFollowUnfollow}
                />
            </>
        );
    }
}

type MapStateToPropsType = {
    usersData: UsersDataType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
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
// const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
//     return {
//         usersData: state.usersPage.usersData,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        usersData: getUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

const mapDispatchToProps = {
    changeFollow,
    setFollowingInProgress,
    getUsers,
    changeFollowUnfollow
}

// export const UsersContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(UsersContainerWithAPI))

export const UsersContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )(UsersContainerWithAPI)