import React from 'react';
import s from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";
import {dialogsDataType} from "../../../Redux/State";


type dialogItemsPropsType={
    dialogsData:dialogsDataType[]
}
type DialogPropsType = {
    name: string
    id: number

}
const DialogItem = (props: DialogPropsType) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog + ' ' + s.active}>
            <img src='data:image/jpeg;base64,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' alt={'img Avatar'}/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export const DialogsItems = (props:dialogItemsPropsType) => {


    let dialogsElement = props.dialogsData.map(d=><DialogItem key={d.id} name={d.name} id={d.id}/>)


    return (
        <div className={s.dialogItems}>
            {dialogsElement}
        </div>


    );
}