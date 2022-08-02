import { inject, observer } from 'mobx-react';
import React from 'react';
import { logout } from '../api/auth';
import { BasePageProps } from '../types/props';

interface IHeader extends BasePageProps {
    
}

const Header: React.FC<IHeader> = ({ store }) => {

    const logoutButtonClicked = async () => store.auth.logout()

    return (
        <>
            <h1>Header</h1>
            <button onClick={logoutButtonClicked}>Выйти</button>
        </>
    )
}

export default inject('store')(observer(Header))