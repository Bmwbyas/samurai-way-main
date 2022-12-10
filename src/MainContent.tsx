import React, {lazy} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {routes} from "./Routes/Routes";
import {withSuspense} from "./hoc/withSuspense";
import {DialogContainer} from "./components/Dialogs/Dialog/DialogContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {LoginContainer} from "./components/Login/LoginContainer";
import Page404 from "./components/common/404/Page404";
import {Content} from "antd/es/layout/layout";

const DialogsContainer = lazy((): any => import('./components/Dialogs/DialogsContainer')
    .then(({DialogsContainer}) => ({default: DialogsContainer})));
export const MainContent = () => {
    return (
        <Content>

            <Switch>

                <Route path={routes.dialogs} render={withSuspense(DialogsContainer)}/>
                <Route path={routes.dialog} render={() => <DialogContainer/>}/>
                <Route path={routes.profile} render={() => <ProfileContainer/>}/>
                <Route path={routes.users} render={() => <UsersContainer/>}/>
                <Route path={routes.login} render={() => <LoginContainer/>}/>
                <Route path={'/'} render={() => <Redirect to={'/login'}/>}/>

                <Route path={'*'} render={() => <Page404/>}/>

            </Switch>

        </Content>
    );
};

