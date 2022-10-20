import React from 'react';
import './App.css';
import {Route, withRouter} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Setting} from "./components/Setting/Setting";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./components/Navbar/NavbarContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/Header.contaiter";
import {LoginContainer} from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {AppStateType} from "./Redux/redux-store";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import {Preloader} from "./components/common/Preloader";


class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
         if(!this.props.initialized){
             return <Preloader/>
         }
        return (

            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavbarContainer/>

                <div className='app-wrapper-content'>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/setting' component={Setting}/>
                    <Route path='/dialogs' render={() =>
                        <DialogsContainer/>
                    }/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <LoginContainer/>}/>

                </div>
            </div>

        );
    }
}
type AppPropsType=MapDispatchToPropsType&MapStateToPropsType
type MapDispatchToPropsType = typeof mapDispatchToProps
type MapStateToPropsType={initialized:boolean}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return{initialized:state.app.initialized}
}

const mapDispatchToProps = {
    initializeApp
}
export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(App)  ;
