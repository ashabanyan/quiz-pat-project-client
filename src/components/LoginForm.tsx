import React, { useMemo } from 'react';
import { Button, Input, Tabs, Typography, notification } from "antd"
import { inject, observer } from "mobx-react"
import { ChangeEvent, useState } from "react"
import { loginUser } from "../api/auth"
import { BasePageProps } from "../types/props"
import { bem } from "../utils/helpers"
import TooltipButton from './subcomponents/TooltipButton';
import { getLoginButtonTooltipText } from '../utils/text-helpers';
import { modifyErrorText } from '../utils/errors-helpers';
const { TabPane } = Tabs;

const b = bem('login-form')

interface ILoginForm extends BasePageProps {

}

const LoginForm: React.FC<ILoginForm> = ({ store }) => {
    const { auth } = store
    const [login, setLogin] = useState<string>()
    const [password, setPassword] = useState<string>()

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
    }
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }  

    const openNotification = (loginData: string) => {
        notification.warning({
          message: 'Ошибка авторизации',
          description: loginData,
        });
      };

    const loginButtonClicked = async () => {
        const loginData = await auth.login(login, password)
        if (loginData) {
            openNotification(modifyErrorText(loginData.toString()))
        }
    }

    const loginButtonToolpitText = useMemo(() => getLoginButtonTooltipText(login, password), [login, password] )
    const loginButtonDisabled = useMemo(() => !login || !password, [login, password])

    return (
        <div className={b('container')}>
            <Input 
                onChange={onInputChange} 
                className={b('input')} 
                size="large" 
                placeholder="Введите ваш логин" 
            />
            <Input 
                onChange={onPasswordChange} 
                className={b('input')} 
                size="large" 
                placeholder="Введите пароль" />
            <TooltipButton 
                title={loginButtonToolpitText}                
                onClick={loginButtonClicked} 
                className={b('loginButton')} 
                type="primary"
                disabled={loginButtonDisabled}
                isTooltipShown={false}
            >
                Войти
            </TooltipButton>
        </div>
    )
}

export default inject('store')(observer(LoginForm))