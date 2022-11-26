import React from 'react';
import style from "../MyPosts.module.css";
import s from "./AddPostForm.module.css";
import {Button, Input, Row} from "antd";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import defaultAvatar from '../../../../assets/defaultAvatarUser.png'
import TextArea from "antd/es/input/TextArea";


interface IFormInput {
    post: string;

}

type AddpostFormType = {
    addPost: (value: string) => void
    name: string | null | undefined
    photo: string | null | undefined
    title: string
    setIsModalOpen: (value: boolean) => void
}
export const AddPostForm: React.FC<AddpostFormType> = ({addPost, name, photo, title, setIsModalOpen}) => {
    const userName = name ?? 'guest'
    const {control, reset, formState: {errors, isValid}, handleSubmit} = useForm<IFormInput>({mode: "onBlur"});
    const onSubmit: SubmitHandler<IFormInput> = data => {
        addPost(data.post)
        setIsModalOpen(false)
        reset()

    };
    const avatar = photo ?? defaultAvatar
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row justify={"center"} className={s.title}>
                {title}
            </Row>

            <Row align={"middle"} className={s.avatarContainer}>
                <img className={style.avatar} src={avatar} alt=""/>
                <span className={s.name}>{name}</span>
            </Row>
            <Row>
                <Controller
                    name="post"
                    control={control}
                    rules={{required: true}}
                    render={({field}) => <TextArea className={s.textArea} {...field} size="middle"
                                                   placeholder={`What's on your mind, ${userName}?`}/>}
                />
            </Row>

            <Row justify={"center"}>
                <Button type="primary" htmlType="submit" disabled={!isValid} size={"middle"}>
                    Post
                </Button>
            </Row>

        </form>

    );
};


