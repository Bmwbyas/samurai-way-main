import React from "react";
import {Checkbox, Input, Row} from "antd";
import {Controller} from "react-hook-form";
import s from "./ContactForm.module.css"

type ContactPropsType = {
    name: string
    errors: any
    control: any
    nameCheckbox: any
    nameInput: any
    valueFromWatch?: any
}
export const ContactForm: React.FC<ContactPropsType> = ({
                                                            errors,
                                                            name, control, nameCheckbox, nameInput
                                                            , valueFromWatch
                                                        }) => {


    return (
        <>
            <Row className={s.contact}>
                <label>{name}
                    <Controller
                        name={nameCheckbox}
                        defaultValue={false}
                        control={control}
                        render={({field: {onChange, value, ...restProps}}) => <Checkbox {...restProps}
                                                                                        onChange={onChange}
                                                                                        checked={value}/>}
                    />
                </label>
                {valueFromWatch &&
                    <>
                        <Row>
                            <Controller
                                name={nameInput}
                                control={control}
                                render={({field}) => <Input  {...field} placeholder={`input your ${name}`}
                                />}
                            />
                        </Row>
                    </>
                }
            </Row>



            <Row style={{color: "red"}} className={s.contact}>
                {errors && errors?.message}
            </Row>
        </>
    )
}