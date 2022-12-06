import React from 'react';
import {Row, Tooltip} from "antd";
import s from './Friend.module.css'
import {NavLink} from "react-router-dom";
import {UsersDataType} from "../../../Redux/users-reducer";

type FriendsPropsType = {

    photo: string

    user:UsersDataType
    navigate:string
    addTochedUser?: (data: { id: number, name: string }) => void
    unfriend?:(user: UsersDataType)=>void
}
const SingleUser: React.FC<FriendsPropsType> = ({ photo,navigate,addTochedUser,unfriend,user}) => {
    const addTochedUserHandler =()=>{

        addTochedUser && addTochedUser({id:user.id,name:user.name})
    }
    const unfriendsUser=()=>{
        console.log('click')
        unfriend && unfriend(user)}
    return (

        <div className={s.friendContainer} onClick={unfriendsUser}>
            <NavLink to={navigate + user.id} onClick={addTochedUserHandler}>
            <Tooltip color={'#1369e1'} title={user.name}>
                <Row justify={"center"}><img className={s.ava} src={photo} alt="ava"/></Row>
                <Row justify={"center"}  className={s.name}>{user.name}</Row>
            </Tooltip>
            </NavLink>
        </div>
    );
};

export default SingleUser;