import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {
    getUserProfile,
    UserProfileType,
    getProfileStatus,
    updateProfileStatus,
    savePhoto, updateProfileData
} from "../../Redux/profile-reduser";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {setMyAvatar} from "../../Redux/auth-reducer";
import {
    clearDataFriends,
    getFriend,
    setPaginationDataFriend,
    setMoreFriends,
    UsersDataType, getUnknown
} from "../../Redux/users-reducer";

export class ProfileContainerAPI extends React.Component<PropsTypeAPI> {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            if (typeof (this.props.userIdMe) === "number") userId = this.props.userIdMe.toString()
            if (!userId) this.props.history.push('/login')
        }


        this.props.getUserProfile(+userId)
        this.props.getProfileStatus(+userId)
        this.props.getUnknown()


    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsTypeAPI>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId
            || this.props.friendsPagination.pageSize !== prevProps.friendsPagination.pageSize )
            this.refreshProfile()
    }

    componentWillUnmount() {
        this.props.setPaginationDataFriend({currentPage: 1, pageSize: 4, totalUsersCount: 0})
        this.props.clearDataFriends()
    }


    render() {
        console.log('profile')
        return (
            <Profile {...this.props} friendsPagination={this.props.friendsPagination}
                     setMoreFriends={this.props.setMoreFriends}
                     isOwner={this.props.userIdMe === this.props.profile?.userId}
                     updateProfileData={this.props.updateProfileData}
                     savePhoto={this.props.savePhoto}usersUnknown={this.props.usersUnknown}
            />
        )
    }
}

type PathParamsType = {
    userId: string,
}
type MapStateToPropsType = {
    profile: UserProfileType | null
    isAuth: boolean
    newStatus: string
    userIdMe: number | null
    friends: UsersDataType[]
    friendsPagination: {
        pageSize: number
        currentPage: number
        totalUsersCount: number
    }
    usersUnknown:UsersDataType[]

}
type MapDispatchToPropsType = typeof mapDispatchToProps
export type ProfileUserPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsTypeAPI = RouteComponentProps<PathParamsType> & ProfileUserPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    newStatus: state.profilePage.newStatus,
    userIdMe: state.auth.id,
    friendsPagination: state.usersPage.friendsPagination,
    friends: state.usersPage.friends,
    usersUnknown:state.usersPage.usersUnknown
})
let mapDispatchToProps = {
    getUserProfile,
    getProfileStatus,
    updateProfileStatus,
    savePhoto,
    updateProfileData,
    setMyAvatar,
    getFriend,
    setMoreFriends,
    setPaginationDataFriend,
    clearDataFriends,
    getUnknown

}

export const ProfileContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainerAPI)