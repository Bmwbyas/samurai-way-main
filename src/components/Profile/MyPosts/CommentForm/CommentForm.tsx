import React from 'react';

import s from "./CommentForm.module.css";
import {Button, Col, Divider,  Row} from "antd";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import defaultAvatar from '../../../../assets/defaultAvatarUser.png'
import TextArea from "antd/es/input/TextArea";
import {SendOutlined} from '@ant-design/icons';

interface IFormInput {
    comment: string;

}

type AddpostFormType = {
    addComment:(payload: {postId: string, comment: string}) => void
    name: string | null | undefined
    photo: string | null | undefined
    postId:string

}
export const CommentForm: React.FC<AddpostFormType> = ({addComment, name, photo,postId}) => {
    const userName = name ?? 'guest'
    const {control, reset, formState: {errors, isValid}, handleSubmit} = useForm<IFormInput>({mode: "onBlur"});
    const onSubmit: SubmitHandler<IFormInput> = data => {
        addComment({postId,comment:data.comment})

    };
    const avatar = photo ?? defaultAvatar
    const disableSendMessage=!isValid?s.sendButton:''
    return (
        <form onSubmit={handleSubmit(onSubmit)}>



            <Row >
                <Divider />
                <Col span={2} >
                    <Row justify={"center"}>
                        <img className={s.avatar} src={avatar} alt=""/>
                    </Row>
                </Col>
                <Col span={19}>
                    <Controller
                        name="comment"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => <TextArea className={s.textArea} {...field}
                                                       placeholder={`input your comment`} autoSize/>}
                    />
                </Col>


                <Col span={3} >
                    <Row className={s.sendButtonContainer}>
                        <Button type="ghost" htmlType="submit" disabled={!isValid} size={"middle"} ghost>
                            <SendOutlined className={disableSendMessage} />
                        </Button>
                    </Row>
                </Col>
            </Row>


        </form>

    );
};


