import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router';
import Layout from './Layout';

interface IPage {
    children: React.ReactNode
    exact: boolean
    path: string
}

const Page: React.FC<IPage> = ({ children, ...rest }) => {
    const history = useHistory()
    const [isAuth, setIsAuth] = useState<boolean>(false)

    useEffect(() => {
        const localStorageAuth = localStorage.getItem('isAuth')
        localStorageAuth ? setIsAuth(true) : history.push('/login')
    }, [])

    return (
        <Route {...rest}>
            <Layout>
                {children}
            </Layout>
        </Route>
    )
}

export default Page;