import React from 'react';
import './Header.module.css'
import { HeaderTSX} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {AuthStateType, logOutAuthUser} from "../../Redux/auth-reducer";


export class HeaderContaiterAPI extends React.Component<AuthPropsType> {
    render() {
        return (
            <HeaderTSX login={this.props.auth.login} isAuth={this.props.auth.isAuth}
                    logOutAuthUser={this.props.logOutAuthUser} avatar={this.props.avatar}/>
        );
    }
}

export type AuthPropsType = MapStateToPropsType & MapDispatchToPropsType
type MapDispatchToPropsType = typeof mapDispatchToProps
type MapStateToPropsType = { auth: AuthStateType,avatar:null|string|undefined }
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        auth: state.auth,
        avatar:state.auth.avatar
    }
}

const mapDispatchToProps = {

    logOutAuthUser
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderContaiterAPI)