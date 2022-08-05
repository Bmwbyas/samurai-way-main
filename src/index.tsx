

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StateType, store} from './Redux/Store'



export const rerenderEntierTree = (_state?:StateType) => {

    ReactDOM.render(
        <App state={store.getState()}
             dispatch={store.dispatch.bind(store)}
             store={store}
             // addPost={store.addPost.bind(store)}
             // updateNewPostsText={store.updateNewPostsText.bind(store)}
             // updateNewMessageText={store.updateNewMessageText.bind(store)}
             // addMessage={store.addMessage.bind(store)}
        />,
        document.getElementById('root')
    );
}
rerenderEntierTree(store.getState());
store.subscribe(rerenderEntierTree);
