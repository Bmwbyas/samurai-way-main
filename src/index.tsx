

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StateType, store} from './Redux/State'

type rerenderEntierTreeType=(state?:StateType)=>void

export const rerenderEntierTree = (state?:StateType) => {

    ReactDOM.render(
        <App state={store.getState()}
             addPost={store.addPost.bind(store)}
             updateNewPostsText={store.updateNewPostsText.bind(store)}
             updateNewMessageText={store.updateNewMessageText.bind(store)}
             addMessage={store.addMessage.bind(store)}/>,
        document.getElementById('root')
    );
}
rerenderEntierTree(store.getState());
store.subscribe(rerenderEntierTree);
