import React from 'react';
import {Row, Tooltip} from "antd";
import s from './Friend.module.css'
import {NavLink} from "react-router-dom";

type FriendsPropsType = {
    name: string
    photo: string
    id:number
    navigate:string
}
const SingleUser: React.FC<FriendsPropsType> = ({name, photo,id,navigate}) => {
    return (

        <div className={s.friendContainer}>
            <NavLink to={navigate + id}>
            <Tooltip color={'#1369e1'} title={name}>
                <Row justify={"center"}><img className={s.ava} src={photo} alt="lz"/></Row>
                <Row justify={"center"} className={s.name}>{name}</Row>
            </Tooltip>
            </NavLink>
        </div>
    );
};

export default SingleUser;