import React from 'react';
import './Header.module.css'
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {AuthStateType, getAuthUserData} from "../../Redux/auth-reducer";



export class HeaderContaiterAPI extends React.Component<AuthPropsType>{

    componentDidMount() {
        this.props.getAuthUserData()
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
     getAuthUserData
}

export  const HeaderContainer=connect(mapStateToProps,mapDispatchToProps)(HeaderContaiterAPI)