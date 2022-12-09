import React from "react";
import s from "./ContactForm.module.css"

import {Checkbox, Row} from "antd";
import {Controller, FieldError} from "react-hook-form";
import {Control} from "react-hook-form/dist/types/form";
import {Inputs} from "../ProfileUserDataForm";
import TextArea from "antd/es/input/TextArea";

type ContactPropsType = {
    name: string
    errors: FieldError | undefined
    control: Control<Inputs>
    nameCheckbox: any
    nameInput: any
    valueFromWatch?: any
    contactValue: any
}
export const ContactForm: React.FC<ContactPropsType> = ({
                                                            errors,
                                                            name, control,
                                                            nameCheckbox, nameInput
                                                            , valueFromWatch, contactValue
                                                        }) => {
const valueChechbox=contactValue===null
    return (
        <>
            <Row className={s.contact}>
                <label>{name}
                    <Controller
                        name={nameCheckbox}
                        defaultValue={!valueChechbox}
                        control={control}
                        render={({field: {onChange, value, ...restProps}}) => <Checkbox {...restProps}
                                                                                        onChange={onChange}
                                                                                        checked={value}/>}
                    />
                </label>
                {valueFromWatch &&
                    <>

                        <Controller
                            name={nameInput}
                            control={control}
                            defaultValue={contactValue}
                            render={({field}) => <TextArea {...field} status={errors && 'error'}
                                                           placeholder={`input your ${name}`} autoSize/>}
                        />

                    </>
                }
            </Row>
            <Row style={{color: "red"}} className={s.contact}>
                {errors && errors?.message}
            </Row>
        </>
    )
}