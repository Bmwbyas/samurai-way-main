import React from 'react';
import './App.css';
import {withRouter} from "react-router-dom";
import {HeaderContainer} from "./components/Header/Header.contaiter";
import {connect} from "react-redux";
import {AppStateType} from "./Redux/redux-store";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import {Preloader} from "./components/common/Preloader/Preloader";
import {Layout} from 'antd';
import {Navbar} from "./components/Navbar/Navbar";
import {Errors} from "./components/common/Errors/Errors";
import {MainContent} from "./MainContent";

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
                    <MainContent/>
                </Layout>
                <Errors errorMessege={'fff'}/>
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
