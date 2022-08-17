import React from 'react';
import {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import Users from "./Users";
import {changeFollowAC, setUsersAC, UsersDataType, UsersPageStateType} from "../../Redux/users-reducer";
import {Dispatch} from "redux";


type MapStateToPropsType={
    usersPage:UsersPageStateType
}
type MapDispatchToPropsType={
    changeFollowed:(userID:number)=>void
        setUsers:(users:UsersDataType[])=>void
}
export type UsersPropsType=MapStateToPropsType&MapDispatchToPropsType
const mapStateToProps=(state:AppStateType):MapStateToPropsType=>{
    return{
        usersPage:state.usersPage

    }
}
const mapDispatchToProps=(dispatch:Dispatch):MapDispatchToPropsType=>{
    return{
     changeFollowed:(userID:number)=>{dispatch(changeFollowAC(userID))},
     setUsers:(users:UsersDataType[])=>{dispatch(setUsersAC(users))}
    }
}

export const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users)

