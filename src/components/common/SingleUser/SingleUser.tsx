import React from 'react';
import {Row, Tooltip} from "antd";
import s from './Friend.module.css'
import {NavLink} from "react-router-dom";
import {UsersDataType} from "../../../Redux/users-reducer";

type FriendsPropsType = {
    isFriends:boolean
    photo: string

    user:UsersDataType
    navigate:string
    addTochedUser?: (data: { id: number, name: string }) => void
    unfriend?:(user: UsersDataType)=>void
}
const SingleUser: React.FC<FriendsPropsType> = ({ photo,navigate,addTochedUser,unfriend,isFriends,user}) => {
    const addTochedUserHandler =()=>{

        addTochedUser && addTochedUser({id:user.id,name:user.name})
    }
    const singleUserContainer=isFriends?s.friendContainer:s.unfriendContainer
    const unfriendsUser=()=>{

        unfriend && unfriend(user)}
    return (

        <div className={singleUserContainer} onClick={unfriendsUser}>
            <NavLink style={{color:"black"}} to={navigate + user.id} onClick={addTochedUserHandler} >
            <Tooltip color={'#1369e1'} title={user.name}>
                <Row justify={"center"}><img className={s.ava} src={photo} alt="ava"/></Row>
                <Row justify={"center"}  className={s.name}>{user.name}</Row>
            </Tooltip>
            </NavLink>
        </div>
    );
};

export default SingleUser;