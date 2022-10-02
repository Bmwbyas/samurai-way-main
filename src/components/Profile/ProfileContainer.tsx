import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {getUserProfile, UserProfileType, getProfileStatus, updateProfileStatus} from "../../Redux/profile-reduser";
import { RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

export class ProfileContainerAPI extends React.Component<PropsTypeAPI> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId){
           if(typeof (this.props.userIdMe)==="number") userId=this.props.userIdMe.toString()
            if(!userId)this.props.history.push('/login')
        }
        this.props.getUserProfile(userId)
        this.props.getProfileStatus(userId)
       
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
    userIdMe:number|null

}
type MapDispatchToPropsType = typeof mapDispatchToProps
export type ProfileUserPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsTypeAPI = RouteComponentProps<PathParamsType> & ProfileUserPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    newStatus: state.profilePage.newStatus,
    userIdMe:state.auth.id

})
let mapDispatchToProps = {
    getUserProfile,
    getProfileStatus,
    updateProfileStatus

}
// let WithUrlDataContainerComponent = withRouter(ProfileContainerAPI)
// export const ProfileContainer= withAuthRedirect(connect(mapStateToProps,mapDispatchToProps)(WithUrlDataContainerComponent))

export const ProfileContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainerAPI)