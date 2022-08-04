import { inject, observer } from 'mobx-react';
import React from 'react';
import { BasePageProps } from '../types/props';
import Logo from '../assets/logo.png'
import { bem } from '../utils/helpers';

const b = bem('header')
interface IHeader extends BasePageProps {
    
}

const Header: React.FC<IHeader> = ({ store }) => {

    // const logoutButtonClicked = async () => store.auth.logout()

    return (
        <>
            <img className={b('logo')} src={Logo} />
            {/* <button onClick={logoutButtonClicked}>Выйти</button> */}
        </>
    )
}

export default inject('store')(observer(Header))