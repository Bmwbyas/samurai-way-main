import React from 'react';
import s from './FormsControl.module.css'

const FormControl:React.FC<any>=({input, meta,child, ...props})=>{
    const hasError=meta.touched&&meta.error
    const finalyClassName=hasError?`${s.formControl} ${s.error}`:s.formControl
    return <div className={finalyClassName}>
        {props.children}
        <br/>
        {hasError && <span>{meta.error}</span>}
    </div>
}

export const Textarea: React.FC<any> = (props) => {
   let {input, meta,children, ...restprops}=props
    return <FormControl {...props}><textarea {...input} {...restprops}/></FormControl>
}
export const Input: React.FC<any> = (props) => {
    let {input, meta,children, ...restprops}=props
    return <FormControl {...props}><input {...input} {...restprops}/></FormControl>
}