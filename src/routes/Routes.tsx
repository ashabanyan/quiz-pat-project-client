import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../pages/main/Main';
import Other from '../pages/other/Other';

const RouterComponent: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Main />
            </Route>
            <Route exact path="/other">
                <Other />
            </Route>
        </Switch>
    )
}

export default RouterComponent;