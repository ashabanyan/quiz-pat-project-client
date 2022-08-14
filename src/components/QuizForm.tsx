import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { IQuizInfoValues, IQuizQuestionsValues, IQuizRoundsValues } from '../types/quiz';
import QuizInfoForm from './quiz-steps/QuizInfo';
import QuizRoundForm from './quiz-steps/QuizRound';
import QuizQuestionsForm from './quiz-steps/QuizQuestions';
import { saveFile } from '../api/fileStorage';
// import { createQuizInfo } from '../api/quiz';
import QuizStepsButtonBlock from './quiz-steps/QuizStepsButtonBlock';
import { modifyQuizObject } from '../utils/quiz-helpers';
import { createQuizInfo } from '../api/quiz';
import { quizInfoSchema } from '../constants/ValidationSchemas';

const steps = ['Параметры квиза', 'Создание раундов', 'Создание вопросов'];

const QuizCreate: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [quizInfo, setQuizInfo] = useState<IQuizInfoValues>(null)
    const [quizRound, setQuizRound] = useState<IQuizRoundsValues>(null)
    const [quizQuestions, setQuizQuestions] = useState<IQuizQuestionsValues>(null)

    useEffect(() => {
        const quiz = { quizInfo, quizRound, quizQuestions }
        console.log(quiz)
    }, [quizInfo, quizRound, quizQuestions])

    // ----------------------------------------------------------------
    const handleNext = () => setActiveStep(activeStep + 1)

    const handleBack = () => setActiveStep(activeStep - 1)

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSaveQuiz = async () => {

        const fileData = await saveFile(quizInfo.cover)
        const { cover, ...rest } = quizInfo
        const quizInfoReq = { ...rest, cover_id: fileData.id }

        const quizRequestObj = modifyQuizObject(quizInfoReq, quizRound, quizQuestions)

        const quizRequest = await createQuizInfo(quizRequestObj)
    }

    // ----------------------------------------------------------------

    const presaveQuizInfo = (values: IQuizInfoValues) => setQuizInfo(values)
    
    const presaveRoundInfo = (values: IQuizRoundsValues) => setQuizRound(values)

    const presaveQuestionInfo = (values: IQuizQuestionsValues) => setQuizQuestions(values)

    const CurrentStepComponent = useMemo(() => {
        return activeStep === 0 
            ? <QuizInfoForm presaveData={presaveQuizInfo} currentData={quizInfo} />
            : activeStep === 1
                ? <QuizRoundForm presaveData={presaveRoundInfo} currentData={quizRound} />
                : <QuizQuestionsForm presaveData={presaveQuestionInfo} roundsInfo={quizRound ? quizRound.rounds : null} currentData={quizQuestions}
                    />
    }, [activeStep])

    const isSaveButtonShown = useMemo(() => {
        return quizInfo && quizRound && quizQuestions
    }, [quizInfo, quizRound, quizQuestions])

    return (
        <>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                    optional?: React.ReactNode;
                } = {};
                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {CurrentStepComponent}
                    </React.Fragment>
            )}

            <QuizStepsButtonBlock 
                activeStep={activeStep} 
                handleBack={handleBack} 
                handleNext={handleNext} 
                stepsLength={steps.length}
            />  

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 2 }}>
                <Button disabled={!isSaveButtonShown} variant="contained" onClick={handleSaveQuiz}>
                    Сохранить квиз
                </Button>
            </Box>

        </>
    )
}

export default QuizCreate;