import React from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../assets/quiz-logo.png'
import { bem } from '../utils/helpers';
import HeaderMenu from './header-components/headerMenu';
import HeaderUserMenu from './header-components/HeaderUserMenu';

const b = bem('header')

const Header: React.FC = () => {
    const history = useHistory()
    const handleLogoClick = () => history.push('/')
    
    return (
        <header className={b()}>
            <img className={b('logo')} src={Logo} onClick={handleLogoClick} />
            <HeaderMenu />
            <HeaderUserMenu />
        </header>
    )
}

export default Header