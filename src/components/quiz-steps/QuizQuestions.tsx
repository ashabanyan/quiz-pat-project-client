import { Box, Grid, SelectChangeEvent, Typography } from '@mui/material';
import { FieldArray, FieldInputProps, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { quizQuestionsForm } from '../../constants/ValidationSchemas';
import { IQuizQuestionItem, IQuizQuestions, IQuizQuestionsValues, IQuizRound } from '../../types/quiz';
import { bem, getRoundCountArray} from '../../utils/helpers';
import FormikDoubleTextInput from '../formik-components/FormikDoubleTextInput';
import FormikSelect from '../formik-components/FormikSelect';
import QuizStepButtonSubmit from './QuizStepButtonSubmit';

const b = bem('quiz-questions')
interface IQuizQuestionsForm {
    roundsInfo: IQuizRound[] | null
    presaveData: (values: IQuizQuestionsValues) => void
    currentData: IQuizQuestionsValues
}

const QuizQuestionsForm: React.FC<IQuizQuestionsForm> = ({ roundsInfo, presaveData, currentData }) => {
    const [isDataPresaved, setIsDataPresaved] = useState<boolean>(!!currentData)
    const createEmptyRoundsQuestions = (): IQuizQuestions[] => roundsInfo && roundsInfo.map((item, index) => ({
        roundId: index,
        questionsCount: null,
        questions: [] as IQuizQuestionItem[]
    })) 

    const initialValues = currentData ?? {
        roundCount: roundsInfo?.length,
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

    const handleSubmit = async (values: IQuizQuestionsValues) => {
        presaveData(values)
        setIsDataPresaved(true)
    }

    return (
        <div className={b()}>
            {roundsInfo ? (<Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={quizQuestionsForm}
            >
                {({ values, setValues, isValid }) => (
                    <Form>
                        <Grid container spacing={3}>
                            {roundsInfo && <FieldArray name="roundsQuestions">
                                {() => 
                                    roundsInfo.map((round, roundIndex) => (
                                        (
                                            <React.Fragment key={`round_${roundIndex}`}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h5" gutterBottom component="div">
                                                        {`Раунд ${round.id + 1}`}
                                                    </Typography>
                                                </Grid>
                                                

                                                <Grid item xs={12}>
                                                    <FormikSelect 
                                                        label = "Количество вопросов" 
                                                        name = {`roundsQuestions.${round.id}.questionsCount`}
                                                        options = {getRoundCountArray(10)}
                                                        values = {values}
                                                        onChangeFunc = {onQuestionsCountChange}
                                                        setValues = {setValues}
                                                    />
                                                </Grid>
                                                                                            
                                                <FieldArray name={`questions`}>
                                                    {() => {
                                                        const currentRound = values.roundsQuestions.find(qitem => qitem.roundId === round.id)
                                                        const currentQuestions = currentRound && currentRound?.questions

                                                        return (
                                                            <>
                                                                {currentQuestions && currentQuestions.map((question, questionIndex) => {
                                                                    return (
                                                                        <FormikDoubleTextInput 
                                                                            key={`round_${roundIndex}_question_${questionIndex}`} 
                                                                            leftName={`roundsQuestions.${round.id}.questions.${question.id}.question`}
                                                                            rightName={`roundsQuestions.${round.id}.questions.${question.id}.answer`}
                                                                            leftLabel="Вопрос"
                                                                            rigthLabel="Ответ"
                                                                            required
                                                                        />  
                                                                    )
                                                                })}
                                                            </>
                                                        )}  
                                                    }
                                                </FieldArray>
                                            </React.Fragment>
                                        )
                                    ))
                                }
                            </FieldArray>}
                        </Grid>
                        <QuizStepButtonSubmit presaved={isDataPresaved} />
                    </Form>
                )}
            </Formik>)
            : (
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 2 }}>
                    Для заполнения данного шага, необходимо заполнить и сохранить черновик шага "Создание раундов"
                </Box>
            )}

        </div>
    )
}

export default QuizQuestionsForm;