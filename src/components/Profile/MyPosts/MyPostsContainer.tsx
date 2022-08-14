import React from 'react';
import './MyPosts.module.css'
import {addPostActionCreator, onPostChangeActionCreator} from "../../../Redux/profile-reduser";
import {MyPosts} from "./MyPosts";
import {StateType} from "../../../Redux/redux-store";
import {connect} from "react-redux";


// type MyPostsPropsType = {
    // postData: postDataType[]
    // addPost:()=>void
    // updateNewPostsText:(newText:string)=>void
    // newPostText: string
    //
    // dispatch: (action: any) => void
    // store:StoreType
// }

// export const MyPostsContainer = (props: MyPostsPropsType) => {
//
//     let addPostHandler = () => {
//         props.addPost()
//         props.store.dispatch(addPostActionCreator());
//     }
//     let onPostChange = (text: string) => {
//         let action = onPostChangeActionCreator(text);
//         props.store.dispatch(action)
//     }
//     return (
//         <StoreContext.Consumer>{(store)=>{
//             let addPostHandler = () => {
//                 // props.addPost()
//                 store.dispatch(addPostActionCreator());
//             }
//             let onPostChange = (text: string) => {
//                 let action = onPostChangeActionCreator(text);
//                 store.dispatch(action)
//             }
//             return(<MyPosts
//                 postData={store.getState().profilePage.postData}
//                 addPost={addPostHandler}
//                 updateNewPostText={onPostChange}
//
//                 newPostText={store.getState().profilePage.newPostText}/>)}}
//         </StoreContext.Consumer>
//     );
// }
let mapStateToProps = (state: StateType) => {
    return {
        profilePage: state.profilePage
    }
}
let mapDispatchToProps = (dispatch:any) => {
    return {
        addPost:()=>{ dispatch(addPostActionCreator())},
        updateNewPostText:(text:string)=>{dispatch(onPostChangeActionCreator(text))}
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
