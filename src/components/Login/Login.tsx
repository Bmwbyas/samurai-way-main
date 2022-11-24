import React from 'react';
import s from './Login.module.css'
import {LoginType} from "./LoginContainer";
import {Redirect} from "react-router-dom";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Col, Input} from 'antd';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {schema} from "./validate/validateLogin";


interface IFormInput {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}


export const Login: React.FC<LoginType> = ({loginAuthUser, isAuth, captcha}) => {

    const {control, handleSubmit, formState: {errors, isValid}} = useForm<IFormInput>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IFormInput> = data => {
        loginAuthUser(data)
        // console.log(data)
    };
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div className={s.loginContainer}>

            <Col span={12} offset={6}>
                <h1 className={s.title}>Log in</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({field}) => <Input  {...field} size="middle" placeholder="input email"
                                                     prefix={<UserOutlined/>}/>}
                    />
                    <div className={s.errorMessage}>{errors.email && errors.email.message}</div>

                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({field}) => <Input.Password {...field} placeholder="input password"
                                                             prefix={<LockOutlined className="site-form-item-icon"/>}/>}
                    />
                    <div className={s.errorMessage}>{errors.password && errors.password.message}</div>

                    <Controller
                        name="rememberMe"
                        control={control}
                        defaultValue={false}
                        render={({field: {onChange, value}}) => <div className={s.rememberMe}><label><Checkbox
                            onChange={onChange} checked={value}/> Remember
                            me</label></div>}
                    />

                    {captcha && <div><img src={captcha} alt=""/></div>}
                    {captcha && <div><Controller
                        name="captcha"
                        control={control}
                        rules={{required: {value: true, message: 'This field is required'}}}
                        render={({field}) => <Input  {...field} size="middle" placeholder="Enter captcha"/>}
                    /></div>}
                    <div className={s.buttonContainer}>
                        <Button className={s.button}  type="primary" htmlType="submit" size={"large"}
                                disabled={!isValid}>
                            Log in
                        </Button>
                    </div>
                </form>
            </Col>
        </div>
    );
};


