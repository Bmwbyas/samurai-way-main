import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {setUserProfile, UserProfileType} from "../../Redux/profile-reduser";
import {RouteComponentProps, withRouter} from "react-router-dom";

export class ProfileContainerAPI extends React.Component<PropsTypeAPI> {
    componentDidMount() {
        let userId=this.props.match.params.userId
        if (!userId) userId='2'
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data)
            });
    }

    render(){
        return(
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}
type PathParamsType = {
    userId: string,
}


type MapStateToPropsType={
   profile:UserProfileType|null
}
type MapDispatchToPropsType = typeof mapDispatchToProps
export type ProfileUserPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsTypeAPI = RouteComponentProps<PathParamsType> & ProfileUserPropsType

let mapStateToProps=(state:AppStateType):MapStateToPropsType=>({
    profile:state.profilePage.profile
})
let mapDispatchToProps={setUserProfile}
let WithUrlDataContainerComponent=withRouter(ProfileContainerAPI)
export const ProfileContainer= connect(mapStateToProps,mapDispatchToProps)(WithUrlDataContainerComponent)