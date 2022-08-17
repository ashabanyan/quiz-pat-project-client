import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { IQuizCategories, IQuizInfoValues, IQuizLevel, IQuizQuestionsValues, IQuizRoundsValues } from '../types/quiz';
import QuizInfoForm from './quiz-steps/QuizInfo';
import QuizRoundForm from './quiz-steps/QuizRound';
import QuizQuestionsForm from './quiz-steps/QuizQuestions';
import { saveImage } from '../api/fileStorage';
import QuizStepsButtonBlock from './quiz-steps/QuizStepsButtonBlock';
import { modifyQuizObject } from '../utils/quiz-helpers';
import { createQuizInfo } from '../api/quiz';
import { getQuizCategories, getQuizLevels } from '../api/nsi';
import { quizCreateSteps } from '../constants/quiz';

interface IQuizCreate {
    activeStep: number
    handleNext: () => void
    handleBack: () => void
}

const QuizCreate: React.FC<IQuizCreate> = ({ activeStep, handleNext, handleBack }) => {
    const [levels, setLevels] = useState<IQuizLevel[]>(null)
    const [categories, setCategories] = useState<IQuizCategories[]>(null)
    // const [activeStep, setActiveStep] = useState(0);
    const [quizInfo, setQuizInfo] = useState<IQuizInfoValues>(null)
    const [quizRound, setQuizRound] = useState<IQuizRoundsValues>(null)
    const [quizQuestions, setQuizQuestions] = useState<IQuizQuestionsValues>(null)

    useEffect(() => {
        getLevels()
        getCategories()
    }, [])

    const getLevels = async () => {
        const data = await getQuizLevels()
        setLevels(data)
    }

    const getCategories = async () => {
        const data = await getQuizCategories()
        setCategories(data)
    }

    // useEffect(() => {
    //     const quiz = { quizInfo, quizRound, quizQuestions }
    //     console.log(quiz)
    // }, [quizInfo, quizRound, quizQuestions])

    // ----------------------------------------------------------------
    // const handleNext = () => setActiveStep(activeStep + 1)

    // const handleBack = () => setActiveStep(activeStep - 1)

    // const handleReset = () => {
    //     setActiveStep(0);
    // };

    const handleSaveQuiz = async () => {

        const fileData = await saveImage(quizInfo.cover)
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
            ? <QuizInfoForm presaveData={presaveQuizInfo} currentData={quizInfo} levels={levels} categories={categories} />
            : activeStep === 1
                ? <QuizRoundForm presaveData={presaveRoundInfo} currentData={quizRound} />
                : <QuizQuestionsForm presaveData={presaveQuestionInfo} roundsInfo={quizRound ? quizRound.rounds : null} currentData={quizQuestions}
                    />
    }, [activeStep, levels, categories])

    const isSaveButtonShown = useMemo(() => {
        return quizInfo && quizRound && quizQuestions
    }, [quizInfo, quizRound, quizQuestions])

    return (
        <>
            <Stepper activeStep={activeStep}>
                {quizCreateSteps.map((label, index) => {
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
            {activeStep === quizCreateSteps.length ? (
                <React.Fragment>
                    {/* <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box> */}
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
                stepsLength={quizCreateSteps.length}
            />  

            {isSaveButtonShown && <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 2 }}>
                <Button variant="contained" onClick={handleSaveQuiz}>
                    Сохранить квиз
                </Button>
            </Box>}

        </>
    )
}

export default QuizCreate;