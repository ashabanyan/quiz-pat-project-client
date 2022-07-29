import React from 'react';
import { Route } from 'react-router';
import Layout from './Layout';

interface IPage {
    children: React.ReactNode
    exact: boolean
    path: string
}

const Page: React.FC<IPage> = ({ children, ...rest }) => {
    return (
        <Route {...rest}>
            <Layout>
                {children}
            </Layout>
        </Route>
    )
}

export default Page;