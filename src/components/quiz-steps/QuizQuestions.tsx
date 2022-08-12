import { Divider, SelectChangeEvent } from '@mui/material';
import { FieldArray, FieldInputProps, Form, Formik } from 'formik';
import React from 'react';
import { quizQuestionsForm } from '../../constants/ValidationSchemas';
import { IQuizQuestionItem, IQuizQuestions, IQuizQuestionsValues, IQuizRound } from '../../types/quiz';
import { getRoundCountArray, logger } from '../../utils/helpers';
import FormikSelect from '../formik-components/FormikSelect';
import FormikTextInput from '../formik-components/FormikTextInput';
import QuizStepsButtonBlock from './QuizStepsButtonBlock';

interface IQuizQuestionsForm {
    activeStep: number
    handleNext: () => void
    handleBack: () => void
    stepsLength: number
    roundsInfo: IQuizRound[] | null
    presaveData: (values: IQuizQuestionsValues) => void
    handleSave: () => void
}

const QuizQuestionsForm: React.FC<IQuizQuestionsForm> = ({ activeStep, handleNext, handleBack, stepsLength, roundsInfo, presaveData, handleSave }) => {
    const createEmptyRoundsQuestions = (): IQuizQuestions[] => roundsInfo && roundsInfo.map((item, index) => ({
        roundId: index,
        questionsCount: null,
        questions: [] as IQuizQuestionItem[]
    }))

    const initialValues = {
        roundsQuestions: createEmptyRoundsQuestions()
    }

    const onQuestionsCountChange = ( 
        e: SelectChangeEvent<any>, 
        field: FieldInputProps<any>, 
        values: IQuizQuestionsValues, 
        setValues: (value: any, shouldValidate?: boolean) => void
    ) => {
        const roundsQuestionsArr = [...values.roundsQuestions]
        const currentValue = e.target.value
        const [, roundId, currentField] = field.name.split('.')
        const changedRoundIndex = roundsQuestionsArr.findIndex(item => item.roundId === parseInt(roundId))

        roundsQuestionsArr[changedRoundIndex] = {
            roundId: parseInt(roundId),
            questionsCount: currentValue,
            questions: Array.from(Array(currentValue).keys()).map((item, index) => ({
                id: index,
                question: '',
                answer: ''
            }))
        }
        
        setValues( { ...values, roundsQuestions: [...roundsQuestionsArr]} )
        field.onChange(e)
    }  

    const handleSubmit = (values: IQuizQuestionsValues) => presaveData(values)

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                // validationSchema={quizQuestionsForm}
            >
                {({ values, setValues, isValid }) => (
                    <Form>

                        {roundsInfo && <FieldArray name="roundsQuestions">
                            {() => 
                                roundsInfo.map((round, index) => {
                                    return (
                                        <div key={round.id}>
                                            <h1>Раунд № {round.id + 1}</h1>
                                            
                                            <FormikSelect 
                                                label = "Количество вопросов" 
                                                name = {`roundsQuestions.${round.id}.questionsCount`}
                                                options = {getRoundCountArray(10)}
                                                values = {values}
                                                onChangeFunc = {onQuestionsCountChange}
                                                setValues = {setValues}
                                            />

                                            <FieldArray name={`questions`}>
                                                {() => {
                                                    
                                                    const currentRound = values.roundsQuestions.find(qitem => qitem.roundId === round.id)
                                                    const currentQuestions = currentRound && currentRound?.questions

                                                    return (
                                                        currentQuestions && currentQuestions.map((question, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <FormikTextInput
                                                                        name={`roundsQuestions.${round.id}.questions.${question.id}.question`}
                                                                        placeholder="Введите вопрос"
                                                                        label="Вопрос"
                                                                        type="text"
                                                                        required
                                                                    />

                                                                    <FormikTextInput
                                                                        name={`roundsQuestions.${round.id}.questions.${question.id}.answer`}
                                                                        placeholder="Введите ответ"
                                                                        label="Ответ"
                                                                        type="text"
                                                                        required
                                                                    />

                                                                    <Divider />
                                                                </div>
                                                            )
                                                        }) 
                                                    )
                                                }  
                                                }
                                            </FieldArray>
                                        </div>
                                    )
                                })
                            }
                        </FieldArray>}

                        <QuizStepsButtonBlock 
                            activeStep={activeStep} 
                            handleBack={handleBack} 
                            handleNext={handleNext} 
                            stepsLength={stepsLength}
                            handleSave={handleSave}
                        />  
                    </Form>
                )}
            </Formik>

        </>
    )
}

export default QuizQuestionsForm;