import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';
import Page from '../components/Page';
import Login from '../pages/Login';
import Main from '../pages/main/Main';
import Other from '../pages/other/Other';

const RouterComponent: React.FC = () => {
    return (
        <Switch>
            <Page exact path="/login">
                <Login />
            </Page>
            <Page exact path="/">
                <Main />
            </Page>
            <Page exact path="/other">
                <Other />
            </Page>
        </Switch>
    )
}

export default RouterComponent;