import React from 'react';
import { bem } from '../utils/helpers';

interface ILayout {
    children: React.ReactNode
}

const b = bem('layout')

const Layout: React.FC<ILayout> = ({ children }) => {

    return (
        <main className={b('container')}>
            <h1>Header</h1>
            {children}
        </main>
    )
}

export default Layout;


