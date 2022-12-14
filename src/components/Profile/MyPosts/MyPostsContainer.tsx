import './MyPosts.module.css'
import {
    addComment,
    addPostActionCreator,
    CommentsStateType,
    PostDataType, toggleLike,
    UserProfileType
} from "../../../Redux/profile-reduser";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../Redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsType={
    avatarProfile:string | null | undefined
    postData:PostDataType[]
    name:string |null | undefined
    profile:UserProfileType | null
    commentData:CommentsStateType
}
type MapDispatchToPropsType = typeof mapDispatchToProps
export type MyPostsPropsType=MapStateToPropsType&MapDispatchToPropsType
let mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        avatarProfile: state.profilePage.profile?.photos.small,
        postData: state.profilePage.postData,
        name:state.profilePage.profile?.fullName,
        profile:state.profilePage.profile,
        commentData:state.profilePage.commentData
    }
}
let mapDispatchToProps = {
    addComment,
    addPost:addPostActionCreator,
    toggleLike


}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
