import React from 'react';
import './Header.module.css'
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {AuthStateType, logOutAuthUser} from "../../Redux/auth-reducer";


export class HeaderContaiterAPI extends React.Component<AuthPropsType> {
    render() {
        return (
            <Header login={this.props.auth.login} isAuth={this.props.auth.isAuth}
                    logOutAuthUser={this.props.logOutAuthUser}/>
        );
    }
}

export type AuthPropsType = MapStateToPropsType & MapDispatchToPropsType
type MapDispatchToPropsType = typeof mapDispatchToProps
type MapStateToPropsType = { auth: AuthStateType }
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = {

    logOutAuthUser
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderContaiterAPI)