import React from 'react';
import { inject, observer } from "mobx-react"
import { BaseComponentProps } from "../types/props"
import { bem } from "../utils/helpers"
import FormikTextInput from './formik-components/FormikTextInput';
import { Formik, Form } from 'formik';
import { loginFormSchema } from '../constants/ValidationSchemas';
import { Button } from '@mui/material';

const b = bem('login-form')

interface ILoginForm extends BaseComponentProps {

}

const LoginForm: React.FC<ILoginForm> = ({ store }) => {
    const { auth } = store

    const initialValues = {
        email: '',
        password: ''
    }

    const loginButtonClicked = async (values: { email: string; password: string }) => {
        const { email, password } = values
        const loginData = await auth.login(email, password)
    }

    return (
        <div className={b('container')}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    loginButtonClicked(values)
                }}
                validationSchema = {loginFormSchema}
            >
                {({values, isValid}) => (
                    <Form>
                        <FormikTextInput name="email" placeholder="Введите Email" label="Email" required />
                        <FormikTextInput name="password" placeholder="Введите пароль" label="Пароль" type="password" required />
                        <Button                
                            className={b('loginButton')} 
                            disabled={!isValid}
                            variant="contained"
                            type="submit"
                            size="small"
                        >
                            Войти
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default inject('store')(observer(LoginForm))