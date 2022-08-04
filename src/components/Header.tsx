import { inject, observer } from 'mobx-react';
import React from 'react';
import { BasePageProps } from '../types/props';
import Logo from '../assets/logo/Quiz-logos_black.png'

interface IHeader extends BasePageProps {
    
}

const Header: React.FC<IHeader> = ({ store }) => {

    const logoutButtonClicked = async () => store.auth.logout()

    return (
        <>
            {Logo}
            <h1>Header</h1>
            <button onClick={logoutButtonClicked}>Выйти</button>
        </>
    )
}

export default inject('store')(observer(Header))