import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";

import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Setting} from "./components/Setting/Setting";
import {StateType, StoreType} from "./Redux/Store";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";


type AppPropsType = {
    state:StateType
    // addPost: () => void
    // updateNewPostsText: (newText: string) => void
    // addMessage: () => void
    // updateNewMessageText: (text: string) => void
    dispatch: (action: any) => void
    store:StoreType
}

function App(props: AppPropsType) {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar store={props.store}/>

                <div className='app-wrapper-content'>
                    {/*<Route path='/dialogs' component={Dialogs}/>*/}
                    {/*<Route path='/profile' component={Profile}/>*/}
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/setting' component={Setting}/>
                    <Route path='/dialogs' render={() =>
                        <DialogsContainer
                            store={props.store}
                        />
                    }/>
                    <Route path='/profile' render={() =>
                        <Profile
                            store={props.store}
                        />}/>


                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
