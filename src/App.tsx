import React, {lazy} from 'react';
import './App.css';
import {Route, withRouter,Switch} from "react-router-dom";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/Header.contaiter";
import {LoginContainer} from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {AppStateType} from "./Redux/redux-store";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import {Preloader} from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {Layout} from 'antd';
import {Navbar} from "./components/Navbar/Navbar";
import {routes} from "./Routes/Routes";
import {DialogContainer} from "./components/Dialogs/Dialog/DialogContainer";
import Page404 from "./components/common/404/Page404";


const {Content} = Layout;

const DialogsContainer = lazy((): any => import('./components/Dialogs/DialogsContainer')
    .then(({DialogsContainer}) => ({default: DialogsContainer})));

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        console.log('app render')

        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <Layout>
                <HeaderContainer/>

                <Layout>
                    {this.props.isAuth && <Navbar/>}
                    <Content>
                        <Switch>
                            <Route path={routes.dialogs} render={withSuspense(DialogsContainer)}/>
                            <Route path={routes.dialog} render={() => <DialogContainer/>}/>
                            <Route path={routes.profile} render={() => <ProfileContainer/>}/>
                            <Route path={routes.users} render={() => <UsersContainer/>}/>
                            <Route path={routes.login} render={() => <LoginContainer/>}/>
                            <Route path={'/'} render={() => <ProfileContainer/>}/>
                            <Route path={'*'} render={() => <Page404/>}/>
                        </Switch>
                    </Content>
                </Layout>

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
