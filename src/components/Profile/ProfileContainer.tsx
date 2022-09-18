import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {changeStatus, getUserProfile, UserProfileType} from "../../Redux/profile-reduser";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


export class ProfileContainerAPI extends React.Component<PropsTypeAPI> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        this.props.getUserProfile(userId)
    }

    render() {

        return (
            <Profile {...this.props} />
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
}
type MapDispatchToPropsType = typeof mapDispatchToProps
export type ProfileUserPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsTypeAPI = RouteComponentProps<PathParamsType> & ProfileUserPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    newStatus: state.profilePage.newStatus
})
let mapDispatchToProps = {
    getUserProfile,
    changeStatus
}
let WithUrlDataContainerComponent = withRouter(ProfileContainerAPI)
// export const ProfileContainer= withAuthRedirect(connect(mapStateToProps,mapDispatchToProps)(WithUrlDataContainerComponent))

export const ProfileContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainerAPI)