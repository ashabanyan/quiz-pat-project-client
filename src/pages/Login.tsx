import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Button, Input, Tabs, Typography } from 'antd';
import 'antd/dist/antd.css';
import { bem } from '../utils/helpers';
import { useHistory } from 'react-router';
import { inject, observer } from 'mobx-react'
import { BasePageProps } from '../types/props';
import { loginUser } from '../api/auth';
import ApiService from '../api/apiService'
import LoginForm from '../components/LoginForm';
const { TabPane } = Tabs;

const b = bem('login')

interface ILogin extends BasePageProps {}

const Login: React.FC<ILogin> = ({ store }) => {
    const { auth } = store

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <div className={b('container')}>
            <Tabs onChange={onChange} type="card">
                <TabPane tab="Авторизация" key="1">
                    <LoginForm />
                </TabPane>
                <TabPane tab="Регистрация" key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </div>
    )
}

export default inject('store')(observer(Login));