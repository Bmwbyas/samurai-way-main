import React from 'react';
import {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import {
    changeFollow,
    changeFollowUnfollow,
    getUsers,
    setFollowingInProgress, updateUsersParams,
    UsersDataType
} from "../../Redux/users-reducer";
import {Users} from "./Users";
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


class UsersContainerWithAPI extends React.PureComponent<UsersPropsType> {

    componentDidMount() {
        const {currentPage,pageSize}=this.props
        this.props.getUsers({page:currentPage, count:pageSize})
        console.log('didmount users')
    }
    //
    // setSearchValue=(term:string)=>{
    //     this.props.getUsers({term})
    // }
    setPaginationValue = (params:{page?: number,count?:number,term?:string}) => {

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
                    defaultSearchValue={this.props.defaultSearchValue}
                    // getSearchUsers={this.setPaginationValue}
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
    defaultSearchValue:string|null|undefined
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
        getUsersParams: state.usersPage.getUsersParams,
        defaultSearchValue:state.usersPage.getUsersParams.term
    }
}

const mapDispatchToProps = {
    changeFollow,
    setFollowingInProgress,
    getUsers,
    changeFollowUnfollow,

    updateUsersParams
}

// export const UsersContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(UsersContainerWithAPI))

export const UsersContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )(UsersContainerWithAPI)