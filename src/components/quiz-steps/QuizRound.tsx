import { Grid } from '@mui/material';
import { FieldArray, FieldInputProps, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { quizRoundSchema } from '../../constants/ValidationSchemas';
import { IQuizRound, IQuizRoundsValues } from '../../types/quiz';
import { bem, getRoundCountArray } from '../../utils/helpers';
import FormikSelect from '../formik-components/FormikSelect';
import FormikTextInput from '../formik-components/FormikTextInput';
import QuizStepButtonSubmit from './QuizStepButtonSubmit';

const b = bem('quiz-round')

interface IQuizRoundForm {
    presaveData: (values: IQuizRoundsValues) => void
    currentData: IQuizRoundsValues | null
}

const QuizRoundForm: React.FC<IQuizRoundForm> = ({ currentData, presaveData }) => {
    const [isDataPresaved, setIsDataPresaved] = useState<boolean>(!!currentData)

    const initialValues = currentData ?? {
        roundCount: "",
        rounds: [] as IQuizRound[]
    }

    const onRoundCountChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: FieldInputProps<any>,
        values: any,
        setValues: (value: any, shouldValidate?: boolean) => void
    ) => {
        const rounds = [...values.rounds]
        const selectedCount = parseInt(e.target.value)
        const previousCount = parseInt(field.value || 0)

        if (previousCount < selectedCount) {
            for (let i = previousCount; i < selectedCount; i++) {
                rounds.push({ id: i, name: '' });
            }
        } else {
            for (let i = previousCount; i >= selectedCount; i--) {
                rounds.splice(i, 1)
            }
        }

        setValues({ ...values, rounds })
        field.onChange(e)
    }

    const handleSubmit = (values: IQuizRoundsValues) => {
        presaveData(values)
        setIsDataPresaved(true)
    }

    return (
        <div className={b()}>
            <Formik
                initialValues={initialValues}
                validationSchema={quizRoundSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setValues }) => (
                    <Form>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormikSelect
                                    label="Количество раундов"
                                    name="roundCount"
                                    options={getRoundCountArray(10)}
                                    values={values}
                                    onChangeFunc={onRoundCountChange}
                                    setValues={setValues}
                                />
                            </Grid>

                            <FieldArray name="rounds">
                                {() =>
                                    values.rounds.map((item, index) => {
                                        return (
                                            <Grid item xs={12} key={index}>
                                                <FormikTextInput
                                                    name={`rounds.${index}.name`}
                                                    placeholder="Введите название раунда"
                                                    label={`Название раунда № ${index + 1}`}
                                                    type="text"
                                                    required
                                                />
                                            </Grid>
                                        )
                                    })
                                }
                            </FieldArray>
                        </Grid>
                        <QuizStepButtonSubmit presaved={isDataPresaved} />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default QuizRoundForm;