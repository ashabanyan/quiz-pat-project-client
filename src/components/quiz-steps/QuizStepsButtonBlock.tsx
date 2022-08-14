import { Box, Button } from '@mui/material';
import React from 'react';

interface IQuizStepsButtonBlock {
    activeStep: number
    handleBack: () => void
    handleNext: () => void
    stepsLength: number
}

const QuizStepsButtonBlock: React.FC<IQuizStepsButtonBlock> = ({ activeStep, handleNext, handleBack, stepsLength, }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
            <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            >
                Назад
            </Button>

            <Button disabled={activeStep === stepsLength - 1} onClick={handleNext}>
                Вперед
            </Button>
        </Box>
    )
}

export default QuizStepsButtonBlock