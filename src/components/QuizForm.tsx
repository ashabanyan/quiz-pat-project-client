import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { IQuizInfoForm, IQuizQuestionsValues, IQuizRound, IQuizRoundsValues } from '../types/quiz';
import QuizInfoForm from './quiz-steps/QuizInfo';
import { QuizSteps } from '../types/enums/quiz'
import QuizRoundForm from './quiz-steps/QuizRound';
import QuizQuestionsForm from './quiz-steps/QuizQuestions';

const steps = ['Параметры квиза', 'Создание раундов', 'Создание вопросов'];

const QuizCreate: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [quizInfo, setQuizInfo] = useState<IQuizInfoForm>(null)
    const [quizRound, setQuizRound] = useState<IQuizRoundsValues>(null)
    const [quizQuestions, setQuizQuestions] = useState<IQuizQuestionsValues>(null)

    // ----------------------------------------------------------------
    const handleNext = () => setActiveStep(activeStep + 1)

    const handleBack = () => setActiveStep(activeStep - 1)

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSaveQuiz = () => {
        console.log({quizInfo,quizRound,quizQuestions})

        
    }
    // ----------------------------------------------------------------

    const presaveQuizInfo = (values: IQuizInfoForm, step: QuizSteps) => setQuizInfo(values)
    

    const presaveRoundInfo = (values: IQuizRoundsValues, step: QuizSteps) => setQuizRound(values)

    const presaveQuestionInfo = (values: IQuizQuestionsValues) => setQuizQuestions(values)

    const stepComponenProps = {
        activeStep: activeStep,
        handleNext: handleNext,
        handleBack: handleBack,
        stepsLength: steps.length,
    }

    const CurrentStepComponent = useMemo(() => {
        return activeStep === 0 
            ? <QuizInfoForm {...stepComponenProps} presaveData={presaveQuizInfo} currentData={quizInfo} />
            : activeStep === 1
                ? <QuizRoundForm {...stepComponenProps} presaveData={presaveRoundInfo} currentData={quizRound} />
                : <QuizQuestionsForm 
                    {...stepComponenProps} 
                    presaveData={presaveQuestionInfo} 
                    roundsInfo={quizRound ? quizRound.rounds : null} 
                    handleSave={handleSaveQuiz}
                    />
    }, [activeStep])

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
        </>
    )
}

export default QuizCreate;