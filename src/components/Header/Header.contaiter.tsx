import React from 'react';
import './Header.module.css'
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {AuthStateType, setUserData} from "../../Redux/auth-reducer";


export class HeaderContaiterAPI extends React.Component<AuthPropsType>{

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{withCredentials:true})
            .then(response => {
                if(response.data.resultCode===0){
                let {id,email,login}=response.data.data
               this.props.setUserData(id,email,login)
                }

            });
    }

    render(){
    return (
        <Header login={this.props.auth.login} isAuth={this.props.auth.isAuth}/>
    );
}
}
type MapStateToPropsType={
    auth:AuthStateType
}
export type AuthPropsType = MapStateToPropsType & MapDispatchToPropsType
type MapDispatchToPropsType = typeof mapDispatchToProps
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
      auth:state.auth
    }
}

const mapDispatchToProps = {
    setUserData
}

export  const HeaderContainer=connect(mapStateToProps,mapDispatchToProps)(HeaderContaiterAPI)