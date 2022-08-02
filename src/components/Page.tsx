import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { useHistory } from 'react-router-dom';
import { refreshToken } from '../api/auth';
import { BasePageProps } from '../types/props';
import Layout from './Layout';
import LoginForm from '../pages/Login';
import { TailSpin } from  'react-loader-spinner'
import LoadingSpinner from './LoadingSpinner';

interface IPage extends BasePageProps {
    children: React.ReactNode
    exact?: boolean
    path?: string
}

const Page: React.FC<IPage> = ({ store, children, ...rest }) => {
    const { auth } = store
    const { isAuth } = auth
    const history = useHistory()

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            auth.checkToken()
        }
    }, [])

    if (auth.isLoading) {
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