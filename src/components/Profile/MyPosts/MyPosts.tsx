import React, {RefObject} from 'react';
import './MyPosts.module.css'
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {postDataType} from "../../../Redux/State";


type MyPostsPropsType = {
    postData: postDataType[]
    addPost:()=>void
    newPostText:string
    updateNewPostsText:(newText:string)=>void
}

export const MyPosts = (props: MyPostsPropsType) => {

    const postElement = props.postData.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    let newPostElement: RefObject<HTMLTextAreaElement> = React.createRef();

   let addPostHandler=()=>{

           props.addPost();


       }


   let onPostChange=()=>{
     let  text = newPostElement?.current?.value
       if(text) props.updateNewPostsText(text)
   }
    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>

            <div>
                <div>
                    <textarea ref={newPostElement} onChange={onPostChange}  value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPostHandler}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    );
}