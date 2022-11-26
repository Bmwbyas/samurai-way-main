import './MyPosts.module.css'
import {addPostActionCreator, PostDataType, UserProfileType} from "../../../Redux/profile-reduser";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../Redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";

type MapStateToPropsType={
    avatarProfile:string | null | undefined
    postData:PostDataType[]
    name:string |null | undefined
    profile:UserProfileType | null
}
type MapDispatchToPropsType={
    addPost:(newPost:string)=>void

}
export type MyPostsPropsType=MapStateToPropsType&MapDispatchToPropsType
let mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        avatarProfile: state.profilePage.profile?.photos.small,
        postData: state.profilePage.postData,
        name:state.profilePage.profile?.fullName,
        profile:state.profilePage.profile
    }
}
let mapDispatchToProps = (dispatch:Dispatch):MapDispatchToPropsType => {
    return {
        addPost:(newPost)=>{ dispatch(addPostActionCreator(newPost))}
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
