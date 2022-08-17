import { Box, Button } from '@mui/material';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { presavedButtonTooltipText, SaveStepDraftButtonText } from '../../constants/quiz';
import TooltipComponent from '../sub-components/TooltipComponent';

interface IQuizStepButtonSubmit {
    presaved?: boolean;
}

const QuizStepButtonSubmit: React.FC<IQuizStepButtonSubmit> = ({ presaved }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 2 }}>
            <Button type="submit">
                {SaveStepDraftButtonText}
                {presaved && (
                    <TooltipComponent title={presavedButtonTooltipText}>
                        <CheckCircleIcon />
                    </TooltipComponent>
                )}
            </Button>
        </Box>
    )
}

export default QuizStepButtonSubmit;