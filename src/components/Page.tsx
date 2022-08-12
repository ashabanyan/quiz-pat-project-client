import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Route } from 'react-router';
import { BasePageProps } from '../types/props';
import Layout from './Layout';
import LoginForm from '../pages/Login';
import LoadingSpinner from './LoadingSpinner';

interface IPage extends BasePageProps {
    children: React.ReactNode
    exact?: boolean
    path?: string
}

const Page: React.FC<IPage> = ({ store, children, ...rest }) => {
    const { auth } = store
    const { isAuth, isLoading } = auth

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            auth.checkToken()
        }
    }, [])

    if (isLoading) {
        return <LoadingSpinner height="200" width="200" />
    }

    if (!isAuth) {
        return <LoginForm />
    }

    return (
        <Route {...rest}>
            <Layout>
                {children}
            </Layout>
        </Route>
    )
}

export default inject('store')(observer(Page))
