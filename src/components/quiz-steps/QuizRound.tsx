import { Box, Button, SelectChangeEvent } from '@mui/material';
import { FieldArray, FieldInputProps, Form, Formik } from 'formik';
import React from 'react';
import { quizRoundSchema } from '../../constants/ValidationSchemas';
import { IQuizRound, IQuizRoundsValues } from '../../types/quiz';
import { getRoundCountArray } from '../../utils/helpers';
import FormikSelect from '../formik-components/FormikSelect';
import FormikTextInput from '../formik-components/FormikTextInput';

interface IQuizRoundForm {
    presaveData: (values: IQuizRoundsValues) => void
    currentData: IQuizRoundsValues | null
}

const QuizRoundForm: React.FC<IQuizRoundForm> = ({ currentData, presaveData }) => {
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

        // console.log('event ---- ', typeof e.target.value)

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
        console.log('hello')
        presaveData(values)
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                // validationSchema={quizRoundSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setValues }) => (
                    <Form>
                        <FormikSelect
                            label="Количество раундов"
                            name="roundCount"
                            options={getRoundCountArray(10)}
                            values={values}
                            onChangeFunc={onRoundCountChange}
                            setValues={setValues}
                        />

                        <FieldArray name="rounds">
                            {() =>
                                values.rounds.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <FormikTextInput
                                                name={`rounds.${index}.name`}
                                                placeholder="Введите название раунда"
                                                label="Название"
                                                type="text"
                                                required
                                            />
                                        </div>
                                    )
                                })
                            }
                        </FieldArray>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 2 }}>
                            <Button type="submit">
                                Сохранить черновик шага
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default QuizRoundForm;