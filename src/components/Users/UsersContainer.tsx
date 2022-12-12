import React from 'react';
import {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import {
    changeFollow,
    changeFollowUnfollow,
    getFriend,
    getUsers,
    setFollowingInProgress,
    updateUsersParams,
    UsersDataType
} from "../../Redux/users-reducer";
import {Users} from "./Users";
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
import {GetUsersParamsType} from "../../api/api";
import {getUserProfile} from "../../Redux/profile-reduser";


class UsersContainerWithAPI extends React.Component<UsersPropsType> {

    componentDidMount() {
        const {pageSize} = this.props
        this.props.getUsers({page: 1, count: pageSize,term:null})
        console.log('did mount users')
        if (this.props.profileId !== this.props.myId) {
            this.props.getUserProfile(this.props.myId!)
            this.props.getFriend(true)
        }
        if (this.props.friends.length===0){
            this.props.getFriend(true)
        }
    }


    updateUsersData = (params: { page?: number, count?: number, term?: string }) => {
        this.props.getUsers({...params})
    }


    componentWillUnmount() {
        console.log('unmountUsers')
        updateUsersParams({page: 1})
    }

    render() {
        console.log('UsersContainerWithAPI Component render')
        return (
            <>
                {/*<Skeleton loading={this.props.isFetching} style={{height:'75vh'}}>*/}
                    <Users

                        key={this.props.totalUsersCount}
                        usersData={this.props.usersData}
                        updateUsersData={this.updateUsersData}
                        currentPage={this.props.currentPage}
                        pageSize={this.props.pageSize}
                        totalUsersCount={this.props.totalUsersCount}
                        followingInProgress={this.props.followingInProgress}
                        changeFollowUnfollow={this.props.changeFollowUnfollow}
                        isLoading={this.props.isLoading}
                        defaultSearchValue={this.props.defaultSearchValue}
                        friends={this.props.friends}
                        isOwner={this.props.myId === this.props.profileId}
                    />
                {/*</Skeleton>*/}
            </>
        );
    }
}

type MapStateToPropsType = {
    usersData: UsersDataType[]
    pageSize: number | undefined
    totalUsersCount: number
    currentPage: number | undefined
    isFetching: boolean
    isLoading: boolean
    followingInProgress: number[]
    getUsersParams: GetUsersParamsType
    defaultSearchValue: string | null | undefined
    friends:UsersDataType[]
    profileId:number | undefined
    myId:number | null

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
        followingInProgress: getFollowingInProgress(state),
        isLoading: state.usersPage.isLoading,
        getUsersParams: state.usersPage.getUsersParams,
        defaultSearchValue: state.usersPage.getUsersParams.term,
        friends:state.usersPage.friends,
        profileId:state.profilePage.profile?.userId,
        myId:state.auth.id
    }
}

const mapDispatchToProps = {
    changeFollow,
    setFollowingInProgress,
    getUsers,
    changeFollowUnfollow,
    updateUsersParams,
    getFriend,
    getUserProfile,

}

export const UsersContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(UsersContainerWithAPI)