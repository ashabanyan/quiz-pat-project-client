import { Grid  } from '@mui/material';
import React, { useState } from 'react';
import QuizMainRules from '../components/quiz-steps/QuizMainRules';
import QuizForm from '../components/QuizForm';

const QuizCreatePage: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleNext = () => setActiveStep(activeStep + 1)

    const handleBack = () => setActiveStep(activeStep - 1)

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <QuizMainRules />
                </Grid>
                <Grid item xs={9}>
                    <QuizForm activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
                </Grid>
            </Grid>
        </>
    )
}

export default QuizCreatePage;