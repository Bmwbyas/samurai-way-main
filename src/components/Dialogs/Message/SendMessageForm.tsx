import React from 'react';
import s from "../../Dialogs/Dialogs.module.css";
import {Button, Input} from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";


interface IFormInput {
    message: string;

}
type AddMessageFormType ={
    addNewMessage:(value:string)=>void
}
export const SendMessageForm:React.FC<AddMessageFormType> = ({addNewMessage}) => {

    const {  control, handleSubmit} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => {
        addNewMessage(data.message)
        console.log(data)
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="message"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field}  size="middle" placeholder="input text"/>}
            />

            <div >
                <Button className={s.button} type="primary" htmlType="submit" size={"large"}>
                    add message
                </Button>
            </div>
        </form>

    );
};


