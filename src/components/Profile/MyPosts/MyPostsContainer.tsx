
import './MyPosts.module.css'
import {addPostActionCreator,  ProfilePageStateType} from "../../../Redux/profile-reduser";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../Redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";

type MapStateToPropsType={
    profilePage:ProfilePageStateType
}
type MapDispatchToPropsType={
    addPost:(newPost:string)=>void

}
export type MyPostsPropsType=MapStateToPropsType&MapDispatchToPropsType
let mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}
let mapDispatchToProps = (dispatch:Dispatch):MapDispatchToPropsType => {
    return {
        addPost:(newPost)=>{ dispatch(addPostActionCreator(newPost))}
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
