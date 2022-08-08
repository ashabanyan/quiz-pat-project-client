import { Grid } from '@mui/material';
import React from 'react';
import QuizForm from '../components/QuizForm';

const QuizCreatePage: React.FC = () => {
    return (
        <>
            <h1>QuizCreatePage</h1>
            <Grid container>
                <Grid item xs={3}>
                    Здесь будет информация по шагу
                </Grid>
                <Grid item xs={9}>
                    <QuizForm />
                </Grid>
            </Grid>
        </>
    )
}

export default QuizCreatePage;