import React, { SyntheticEvent, useState } from 'react';
import { bem } from '../utils/helpers';
import { inject, observer } from 'mobx-react'
import { BasePageProps } from '../types/props';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const b = bem('login')

interface ILogin extends BasePageProps {}

const Login: React.FC<ILogin> = ({ store }) => {
    const { auth } = store
    const [currentTab, setCurrentTab] = useState<number>(0)
    
    const handleTabChange = (event: SyntheticEvent, value: number) => setCurrentTab(value)

    return (
        <div className={b('container')}>
            <Tabs className={b('tabs')} value={currentTab} onChange={handleTabChange} centered>
                <Tab label="Авторизации" />
                <Tab label="Регистрация" />
            </Tabs>
            {currentTab === 0 && <LoginForm />}
            {currentTab === 1 && <RegistrationForm />}
        </div>
    )
}

export default inject('store')(observer(Login));