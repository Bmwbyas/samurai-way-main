import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Profile} from "./components/Profile/Profile";
import { Route} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Setting} from "./components/Setting/Setting";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./components/Navbar/NavbarContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/Header.contaiter";


function App() {
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
                <Route path='/profile/:userId?' render={() =><ProfileContainer/>}/>
                <Route path='/users' render={() =><UsersContainer />}/>

            </div>
        </div>

    );
}

export default App;
