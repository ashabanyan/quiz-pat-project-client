import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Button, Input, Typography } from 'antd';
import 'antd/dist/antd.css';
import { bem } from '../utils/helpers';
import { loginUser } from '../api/user';
import { useHistory } from 'react-router';

const b = bem('login')

const Login: React.FC = () => {
    const history = useHistory()
    const [login, setLogin] = useState<string>()
    const [password, setPassword] = useState<string>()

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
    }
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }   

    const onLoginButtonClicked = async () => {
        const loginStatus = await loginUser() 
        console.log(loginStatus)
        // loginUser() 
        //     ? history.push('/')
        //     : console.log('NO!!!')
    }

    // const isLoginButtonDisabled = useMemo(() => !login || !password, [login, password])
    const isLoginButtonDisabled = false

    return (
        <div className={b('container')}>
             <div className={b('form-container')}>
                <Typography.Title className={b('title')} level={2} >
                    Вход
                </Typography.Title>
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
                <Button 
                    onClick={onLoginButtonClicked} 
                    disabled={isLoginButtonDisabled} 
                    className={b('loginButton')} 
                    type="primary"
                >
                    Авторизоваться
                </Button>
             </div>
        </div>
    )
}

export default Login;