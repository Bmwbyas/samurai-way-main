import React, {memo} from 'react';
import './MyPosts.module.css'
import s from './MyPosts.module.css'
import style from '../ProfileInfo/ProfileInfo.module.css'
import {MyPostsPropsType} from "./MyPostsContainer";
import {AddPostForm} from "./AddPostForm/AddPostForm";
import {Posts} from "./Posts/Posts";
import defaultAvatar from '../../../assets/defaultAvatarUser.png'
import {Button, Modal} from "antd";

export const MyPosts: React.FC<MyPostsPropsType> = memo(({addPost,addComment,toggleLike,commentData, avatarProfile, name, postData, profile}) => {
    const [loading, setLoading] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const avatar = avatarProfile ?? defaultAvatar
    const userName = name ?? 'guest'

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <div>
            <div className={style.profileInfoContainer}>
                <div className={s.addPostContainer}>
                    <img className={s.avatar} src={avatar} alt="myAva"/>
                    <Button className={s.button} onClick={showModal} size={"middle"} block>What's on your
                        mind,{userName}? </Button>
                </div>
            </div>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>

                <AddPostForm title='Create post' setIsModalOpen={setIsModalOpen} photo={profile?.photos.small}
                             name={profile?.fullName} addPost={addPost}/>
            </Modal>

            <div className={s.posts}>

                <Posts toggleLike={toggleLike} commentData={commentData} avatarProfile={avatarProfile} postData={postData} addComment={addComment}/>

            </div>

        </div>
    );
})