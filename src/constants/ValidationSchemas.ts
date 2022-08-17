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
    category_id: Yup.number().required(requiredField),
    level_id: Yup.number().required(requiredField),
    cover: Yup.mixed().required(requiredField)
})

export const quizRoundSchema = Yup.object({
    roundCount: Yup.number().required(requiredField).min(1, 'Минимум 1').max(10, 'Маскимум 10'),
    rounds: Yup.array().of(
        Yup.object().shape({
            id: Yup.number().required(requiredField),
            name: Yup.string().required(requiredField),
        })
    ).test({
        name: 'equal',
        exclusive: false,
        params: { },
        message: 'Количество заполненных раундов должно соответствовать количеству заданных раундов',
        test: function (value) {
            return value.length === this.parent.roundCount
        },
      }),
})

export const quizQuestionsForm = Yup.object({
    roundCount: Yup.number().required(requiredField),
    roundsQuestions: Yup.array().of(
        Yup.object().shape({
            roundId: Yup.number().required(requiredField),
            questionsCount: Yup.number().typeError(requiredField).required(requiredField),
            questions: Yup.array().of(
                Yup.object().shape({
                    id: Yup.number().required(requiredField),
                    question: Yup.string().required(requiredField),
                    answer: Yup.string().required(requiredField)
                })
            ).test({
                name: 'equal',
                exclusive: false,
                params: { },
                message: 'Количество заполненных вопросов должно соответствовать количеству выбранных вопросов',
                test: function (value) {
                    return value.length === this.parent.questionsCount
                },
            })
        })
    ).test({
        name: 'equal',
        exclusive: false,
        params: { },
        message: 'Количество заполненных раундов должно соответствовать количеству выбранных раундов',
        test: function (value) {
            return value.length === this.parent.roundCount
        },
    })
})