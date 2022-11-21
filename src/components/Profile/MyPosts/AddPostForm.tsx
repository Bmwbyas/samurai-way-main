import React from 'react';
import s from "../../Dialogs/Dialogs.module.css";
import {Button, Input} from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";


interface IFormInput {
    post: string;

}
type AddpostFormType={
    addPost:(value:string)=>void
}
export const AddPostForm:React.FC<AddpostFormType> = ({addPost}) => {

    const {  control, handleSubmit} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => {
        addPost(data.post)
        console.log(data)
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="post"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field}   size="middle" placeholder="input text"/>}
            />

            <div >
                <Button className={s.button} type="primary" htmlType="submit" size={"large"}>
                    add post
                </Button>
            </div>
        </form>

    );
};


