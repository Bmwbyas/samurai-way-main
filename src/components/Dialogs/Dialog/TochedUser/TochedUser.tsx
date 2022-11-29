import React from 'react';
import {Row} from "antd";
import {NavLink} from "react-router-dom";
import s from './TochedUser.module.css'

type TochedUserType = {
    name: string
    id: number
}
export const TochedUser: React.FC<TochedUserType> = ({name, id}) => {
    return (
            <NavLink style={{color:"black"}} to={'/dialog/' + id}>
                <Row  className={s.name}> {name}</Row>
            </NavLink>
    );
};

