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
        const {currentPage,pageSize}=this.props
        this.props.getUsers(currentPage, pageSize)
    }

    setCurrentPages = (pageNumber: number) => {
        const {pageSize}=this.props
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching&& <Preloader/>}
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

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType
type MapDispatchToPropsType = typeof mapDispatchToProps

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