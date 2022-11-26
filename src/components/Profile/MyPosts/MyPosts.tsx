import React, {memo} from 'react';
import './MyPosts.module.css'
import s from './MyPosts.module.css'
import style from '../ProfileInfo/ProfileInfo.module.css'
import {MyPostsPropsType} from "./MyPostsContainer";
import {AddPostForm} from "./AddPostForm/AddPostForm";
import {Posts} from "./Posts/Posts";
import defaultAvatar from '../../../assets/defaultAvatarUser.png'
import {Button, Modal} from "antd";

export const MyPosts: React.FC<MyPostsPropsType> = memo(({addPost, avatarProfile, name, postData, profile}) => {

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
        <div >
            <div className={style.profileInfoContainer}>
                <div className={s.addPostContainer}>
                    <img className={s.avatar} src={avatar} alt="myAva"/>
                    <Button className={s.button} onClick={showModal} size={"middle"} block>What's on your
                        mind,{userName}? </Button>
                </div>
            </div>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <AddPostForm photo={profile?.photos.small} name={profile?.fullName} addPost={addPost}/>
            </Modal>
            <div className={style.profileInfoContainer}>
                <div className={s.posts}>

                    <Posts avatarProfile={avatarProfile} postData={postData}/>

                </div>
            </div>
        </div>
    );
})