import React from 'react';
import {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import {
    changeFollowAC,
    setCurrentPageAC, setIsFetchingAC, setTotalCountAC,
    setUsersAC,
    UsersDataType,
    UsersPageStateType
} from "../../Redux/users-reducer";
import {Dispatch} from "redux";
import preloader from './../../assets/defaultAvatarUser.png'
import axios from "axios";
import UsersJsx from "./UsersJSX";
import {Preloader} from "../common/Preloader";

class UsersContainerWithAPI extends React.Component<UsersPropsType, UsersPropsType> {
    componentDidMount() {
        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}
        &count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
                this.props.setIsFetching(false)
            });
    }

    setCurrentPages = (pageNumber: number) => {
        this.props.setIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}
        &count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setIsFetching(false)
            });
    }

    render() {
        return (
            <>

                {this.props.isFetching
                    ?<Preloader/>
                    :null}
                <UsersJsx
                    key={this.props.totalUsersCount}
                    usersData={this.props.usersPage.usersData}
                    setCurrentPage={this.setCurrentPages}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    changeFollowed={this.props.changeFollowed}
                    totalUsersCount={this.props.totalUsersCount}
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
}
type MapDispatchToPropsType = {
    changeFollowed: (userID: number) => void
    setUsers: (users: UsersDataType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
    setIsFetching:(isFetching:boolean)=>void
}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        changeFollowed: (userID: number) => {
            dispatch(changeFollowAC(userID))
        },
        setUsers: (users: UsersDataType[]) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setTotalCountAC(totalCount))
        },
        setIsFetching:(isFetching:boolean)=>dispatch(setIsFetchingAC(isFetching))
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainerWithAPI)

