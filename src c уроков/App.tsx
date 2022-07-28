import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Setting} from "./components/Setting/Setting";
import {StateType} from "./Redux/State";


type AppPropsType = {
    state: StateType

}

function App(props: AppPropsType) {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar navbarData={props.state.navbarData}/>

                <div className='app-wrapper-content'>
                    {/*<Route path='/dialogs' component={Dialogs}/>*/}
                    {/*<Route path='/profile' component={Profile}/>*/}
                    {/*<Route path='/news' component={News}/>*/}
                    {/*<Route path='/music' component={Music}/>*/}
                    {/*<Route path='/setting' component={Setting}/>*/}
                    <Route path='/dialogs' render={() => <Dialogs dialogsPage={props.state.dialogsPage}
                                                                  />}/>
                    <Route path='/profile' render={() => <Profile profilePage={props.state.profilePage}/>}/>


                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
