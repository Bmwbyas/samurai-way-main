import React, {lazy} from 'react';
import './App.css';
import {Redirect, Route, withRouter} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Setting} from "./components/Setting/Setting";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/Header.contaiter";
import {LoginContainer} from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {AppStateType} from "./Redux/redux-store";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import {Preloader} from "./components/common/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {Layout} from 'antd';
import {Navbar} from "./components/Navbar/Navbar";
import {Dialog} from "./components/Dialogs/Dialog/Dialog";


const {Content, Footer} = Layout;

const DialogsContainer = lazy((): any => import('./components/Dialogs/DialogsContainer')
    .then(({DialogsContainer}) => ({default: DialogsContainer})));

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <Layout >
                <HeaderContainer/>
                <Layout >
                    {this.props.isAuth&&<Navbar/>}

                            <Content>
                                <Route path='/news' component={News}/>
                                <Route path='/music' component={Music}/>
                                <Route path='/setting' component={Setting}/>
                                <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                                <Route path='/dialog/:userId' render={()=><Dialog/>}/>
                                <Route path='/profile/:userId?' render={()=><ProfileContainer/>}/>
                                <Route path='/users' render={() => <UsersContainer/>}/>
                                <Route path='/login' render={() => <LoginContainer/>}/>
                                <Route path='/' render={() => <Redirect to={'/login'}/>}/>

                            </Content>



                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        );
    }
}

type AppPropsType = MapDispatchToPropsType & MapStateToPropsType
type MapDispatchToPropsType = typeof mapDispatchToProps
type MapStateToPropsType = { initialized: boolean, isAuth: boolean }
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {initialized: state.app.initialized, isAuth: state.auth.isAuth}
}

const mapDispatchToProps = {
    initializeApp
}
export default compose<React.FC>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(App);
