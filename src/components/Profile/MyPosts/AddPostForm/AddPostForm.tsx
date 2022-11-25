import React from 'react';
import s from "../MyPosts.module.css";
import {Button, Input, Row} from "antd";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import defaultAvatar from '../../../../assets/defaultAvatarUser.png'


interface IFormInput {
    post: string;

}

type AddpostFormType = {
    addPost: (value: string) => void
    name: string | null | undefined
    photo: string | null | undefined
}
export const AddPostForm: React.FC<AddpostFormType> = ({addPost, name, photo}) => {
    const userName = name ?? 'guest'
    const {control, handleSubmit} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => {
        addPost(data.post)

    };
    const avatar = photo ?? defaultAvatar
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <img src={avatar} alt=""/>
                <Controller
                    name="post"
                    control={control}
                    render={({field}) => <Input {...field} size="middle"
                                                placeholder={`What's on your mind,${userName}`}/>}
                />
                <Button className={s.button} type="primary" htmlType="submit" size={"middle"}>
                    Add post
                </Button>
            </Row>
        </form>

    );
};


