import React from 'react';
import {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import {
    changeFollow,
    changeFollowUnfollow, getSearchUsers,
    getUsers,
    setFollowingInProgress, updateUsersParams,
    UsersDataType
} from "../../Redux/users-reducer";
import Users from "./Users";
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
import {GetUsersParamsType} from "../../api/api";


class UsersContainerWithAPI extends React.Component<UsersPropsType> {

    componentDidMount() {
        const {currentPage,pageSize}=this.props
        this.props.getUsers({page:currentPage, count:pageSize})
    }
    //
    setSearchValue=(term:string)=>{
        this.props.updateUsersParams({term})
    }
    setPaginationValue = (params:{page: number,count:number}) => {

        this.props.getUsers({...params})
    }

    render() {
        console.log('UsersContainerWithAPI Component render')
        return (
            <>
                {this.props.isFetching&& <Preloader/>}
                <Users
                    key={this.props.totalUsersCount}
                    usersData={this.props.usersData}
                    setPaginationValue={this.setPaginationValue}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    followingInProgress={this.props.followingInProgress}
                    changeFollowUnfollow={this.props.changeFollowUnfollow}
                    isLoading={this.props.isLoading}
                    getSearchUsers={this.setSearchValue}
                    // getUsers={this.props.getUsers}
                    // updateUsersParams={this.props.updateUsersParams}
                    // getUsersParams={this.props.getUsersParams}

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
    isLoading: boolean
    followingInProgress: number[]
    getUsersParams:GetUsersParamsType
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
        isLoading:state.usersPage.isLoading,
        getUsersParams: state.usersPage.getUsersParams
    }
}

const mapDispatchToProps = {
    changeFollow,
    setFollowingInProgress,
    getUsers,
    changeFollowUnfollow,
    getSearchUsers,
    updateUsersParams
}

// export const UsersContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(UsersContainerWithAPI))

export const UsersContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )(UsersContainerWithAPI)