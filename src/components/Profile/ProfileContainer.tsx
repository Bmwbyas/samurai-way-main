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
import { RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {setMyAvatar} from "../../Redux/auth-reducer";

export class ProfileContainerAPI extends React.Component<PropsTypeAPI> {
    refreshProfile(){
        let userId = this.props.match.params.userId
        if(!userId){
            if(typeof (this.props.userIdMe)==="number") userId=this.props.userIdMe.toString()
            if(!userId)this.props.history.push('/login')
        }

        this.props.getUserProfile(userId)
        this.props.getProfileStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: Readonly<PropsTypeAPI>, prevState: Readonly<{}>, snapshot?: any) {
        if(this.props.match.params.userId!==prevProps.match.params.userId)
        this.refreshProfile()
    }

    render() {

        return (
            <Profile {...this.props} isOwner={!this.props.match.params.userId}updateProfileData={this.props.updateProfileData} savePhoto={this.props.savePhoto}/>
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
    updateProfileStatus,
    savePhoto,
    updateProfileData,
    setMyAvatar

}
// let WithUrlDataContainerComponent = withRouter(ProfileContainerAPI)
// export const ProfileContainer= withAuthRedirect(connect(mapStateToProps,mapDispatchToProps)(WithUrlDataContainerComponent))

export const ProfileContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainerAPI)