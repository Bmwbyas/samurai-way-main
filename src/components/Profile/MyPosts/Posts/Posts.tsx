import React from 'react';
import {Post} from "../Post/Post";
import {CommentsStateType, PostDataType} from "../../../../Redux/profile-reduser";
type PostsType={
    postData: PostDataType[]
    avatarProfile:string | null | undefined
    addComment:(payload: {postId: string, comment: string}) => void
    commentData:CommentsStateType
}
export const Posts:React.FC<PostsType> = ({postData,commentData,avatarProfile,addComment}) => {
    return <> {postData.map(p =>
        <Post
            commentData={commentData}
            message={p.message}
            key={p.id}
            likesCount={p.likesCount}
            avatarProfile={avatarProfile}
            name={'bla'}
            addComment={addComment}
            postId={p.id}
        />)}
    </>
};

