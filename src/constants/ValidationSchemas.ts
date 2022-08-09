import * as Yup from 'yup';
import { emailInvalid, requiredField, passwordInvalid} from './yupErrors';

export const loginFormSchema = Yup.object({
    email: Yup.string()
        .email(emailInvalid)
        .required(requiredField),
    password: Yup.string()
        .min(6, passwordInvalid.min)
        .max(30, passwordInvalid.max)
        .required(requiredField)
})

export const registrationFormSchema = Yup.object({
    email: Yup.string()
        .email(emailInvalid)
        .required(requiredField),
    password: Yup.string()
        .min(6, passwordInvalid.min)
        .max(30, passwordInvalid.max)
        .required(requiredField),
    name: Yup.string().required(requiredField),
    surname: Yup.string().required(requiredField),
    patronymic: Yup.string(),
    role_id: Yup.string().required(requiredField)
})

export const quizInfoSchema = Yup.object({
    name: Yup.string().required(requiredField),
    category: Yup.number().required(requiredField),
    level: Yup.number().required(requiredField),
    cover: Yup.mixed().required('File is required')
})