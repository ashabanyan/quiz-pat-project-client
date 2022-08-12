import { SelectChangeEvent } from '@mui/material';
import { FieldArray, FieldInputProps, Form, Formik } from 'formik';
import React from 'react';
import { quizRoundSchema } from '../../constants/ValidationSchemas';
import { QuizSteps } from '../../types/enums/quiz';
import { IQuizRound, IQuizRoundsValues } from '../../types/quiz';
import { getRoundCountArray } from '../../utils/helpers';
import FormikSelect from '../formik-components/FormikSelect';
import FormikTextInput from '../formik-components/FormikTextInput';
import QuizStepsButtonBlock from './QuizStepsButtonBlock';

interface IQuizRoundForm {
    activeStep: number
    handleNext: () => void
    handleBack: () => void
    stepsLength: number
    presaveData: (values: IQuizRoundsValues, step: QuizSteps) => void
    currentData: IQuizRoundsValues | null
}

const QuizRoundForm: React.FC<IQuizRoundForm> = ({ activeStep, handleNext, handleBack, stepsLength, currentData, presaveData }) => {
    const initialValues = currentData ?? {
        roundCount: "",
        rounds: [] as IQuizRound[]
    }

    const onRoundCountChange = (
        e: SelectChangeEvent<any>,
        field: FieldInputProps<any>,
        values: any,
        setValues: (value: any, shouldValidate?: boolean) => void
    ) => {
        const rounds = [...values.rounds]
        const selectedCount = e.target.value
        const previousCount = parseInt(field.value || '0')

        if (previousCount < selectedCount) {
            for (let i = previousCount; i < selectedCount; i++) {
                rounds.push({ id: i, name: '' });
            }
        } else {
            for (let i = previousCount; i >= selectedCount; i--) {
                rounds.splice(i, 1)
            }
        }

        console.log('test ----- ', { ...values, rounds })
        console.log(e.target.value)

        setValues({ ...values, rounds })
        field.onChange(e)
    }

    const handleSubmit = (values: IQuizRoundsValues) => presaveData(values, QuizSteps.ROUND)

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={quizRoundSchema}
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

                        <QuizStepsButtonBlock
                            activeStep={activeStep}
                            handleBack={handleBack}
                            handleNext={handleNext}
                            stepsLength={stepsLength}
                        />
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default QuizRoundForm;