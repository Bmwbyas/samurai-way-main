import React from 'react';
import {Post} from "../Post/Post";
import {PostDataType} from "../../../../Redux/profile-reduser";
type PostsType={
    postData: PostDataType[]
    avatarProfile:string | null | undefined
}
export const Posts:React.FC<PostsType> = ({postData,avatarProfile}) => {
    return <> {postData.map(p =>
        <Post
            key={p.id}
            message={p.message}
            likesCount={p.likesCount}
            avatarProfile={avatarProfile}
        />)}
    </>
};

