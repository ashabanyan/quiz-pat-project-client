import { Box, Button } from '@mui/material';
import React, { FormEvent } from 'react';
import { IQuizInfoForm } from '../../types/quiz';

interface IQuizStepsButtonBlock {
    activeStep: number
    handleBack: () => void
    handleNext: () => void
    stepsLength: number
    handleSave?: () => void
}

const QuizStepsButtonBlock: React.FC<IQuizStepsButtonBlock> = ({ activeStep, handleNext, handleBack, stepsLength, handleSave }) => {
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

            <Button type="submit">
                Сохранить черновик шага
            </Button>

            {
                activeStep === stepsLength - 1
                    ? (
                        <Button onClick={handleSave}>
                            Сохранить
                        </Button>
                    ) : (
                        <Button onClick={handleNext}>
                            Вперед
                        </Button>
                    )
            }
        </Box>
    )
}

export default QuizStepsButtonBlock