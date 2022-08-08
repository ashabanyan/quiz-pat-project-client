import React from 'react';
import { Switch } from 'react-router-dom';
import Page from '../components/Page';
import AdminPage from '../pages/Admin';
import Main from '../pages/main/Main';
import NotFound from '../pages/NotFound';
import Other from '../pages/other/Other';
import QuizCatalog from '../pages/QuizCatalog';
import QuizCreatePage from '../pages/QuizCreate';

const RouterComponent: React.FC = () => {
    return (
        <Switch>
            <Page exact path="/catalog">
                <QuizCatalog />
            </Page>
            <Page exact path="/admin">
                <AdminPage />
            </Page>
            <Page exact path="/admin/quiz/create">
                <QuizCreatePage />
            </Page>
            <Page exact path="/">
                <Main />
            </Page>
            <Page exact path="/other">
                <Other />
            </Page>
            <Page>
                <NotFound />
            </Page>
        </Switch>
    )
}

export default RouterComponent;