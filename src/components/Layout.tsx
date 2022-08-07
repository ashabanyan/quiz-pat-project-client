import Container from '@mui/material/Container';
import React from 'react';
import { bem } from '../utils/helpers';
import Header from './Header';

interface ILayout {
    children: React.ReactNode
}

const b = bem('layout')

const Layout: React.FC<ILayout> = ({ children }) => {

    return (
        // <div className={b()}>
        <Container maxWidth="xl" className={b()}>
            <Header />
            <main className={b('container')}>
                {children}
            </main>
        </Container>
        // </div>

    )
}

export default Layout;


