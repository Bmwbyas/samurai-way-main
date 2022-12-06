import React from 'react';

import s from "./CommentForm.module.css";
import {Button, Col, Divider, Row} from "antd";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import TextArea from "antd/es/input/TextArea";
import {SendOutlined} from '@ant-design/icons';
import {viewAvatar} from "../../../../utils/ViewAvatar/viewAvatar";

interface IFormInput {
    text: string;

}

type AddpostFormType = {
    submitForm: (text: string) => void
    name: string | null | undefined
    photo: string | null | undefined
}

export const CommentForm: React.FC<AddpostFormType> = ({submitForm,  photo}) => {
    const {control, reset, formState: { isValid}, handleSubmit} = useForm<IFormInput>({mode: "onBlur"});
    const onSubmit: SubmitHandler<IFormInput> = data => {
        submitForm(data.text)
        reset()
    };
    const avatar = viewAvatar(photo)
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
                        name="text"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => <TextArea  className={s.textArea} {...field}
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


