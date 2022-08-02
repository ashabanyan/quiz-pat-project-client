import React from 'react';
import { bem } from '../utils/helpers';
import Header from './Header';

interface ILayout {
    children: React.ReactNode
}

const b = bem('layout')

const Layout: React.FC<ILayout> = ({ children }) => {

    return (
        <main className={b('container')}>
            <Header />
            {children}
        </main>
    )
}

export default Layout;


