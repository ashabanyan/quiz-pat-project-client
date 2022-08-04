import { Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { userRoles } from '../constants/selectsOptions';
import { registrationFormSchema } from '../constants/ValidationSchemas';
import { BaseComponentProps } from '../types/props';
import { IUserRequest } from '../types/user';
import { bem } from '../utils/helpers';
import FormikSelect from './formik-components/FormikSelect';
import FormikTextInput from './formik-components/FormikTextInput';

const b = bem('registration-form')

interface IRegistrationForm extends BaseComponentProps {

}

const RegistrationForm: React.FC<IRegistrationForm>  = ({ store }) => {
    const { auth } = store

    const initialValues: IUserRequest = {
        email: '',
        password: '',
        name: '',
        surname: '',
        patronymic: '',
        role_id: '',
    }

    const registrationButtonClicked = async (values: IUserRequest) => {
        const registrationData = await auth.registration(values)
        console.log(registrationData)
    }

    return (
        <div className={b('container')}>
            <Formik
                initialValues={initialValues}
                validationSchema={registrationFormSchema}
                onSubmit={registrationButtonClicked}
            >
                {({values, isValid}) => (
                    <Form>
                        <FormikTextInput 
                            name="email"
                            placeholder="Введите Email"
                            label="Email"
                            type="text"
                            required
                        />
                        <FormikTextInput 
                            name="password"
                            placeholder="Введите пароль"
                            label="Пароль"
                            type="password"
                            required
                        />
                        <FormikTextInput 
                            name="name"
                            placeholder="Введите ваше имя"
                            label="Имя"
                            required
                        />
                        <FormikTextInput 
                            name="surname"
                            placeholder="Введите вашу фамилию"
                            label="Фамилия"
                            required
                        />
                        <FormikTextInput 
                            name="patronymic"
                            placeholder="Введите ваше отчество"
                            label="Отчество"
                        />
                        <FormikSelect name="role_id" required options={userRoles} />

                        <Button                
                            className={b('registrationButton')} 
                            disabled={!isValid}
                            variant="contained"
                            type="submit"
                            size="small"
                        >
                            Зарегистрироваться
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default inject('store')(observer(RegistrationForm))


// const { email, password, name, surname, patronymic, role } = req.body;
