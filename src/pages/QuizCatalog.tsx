import { Grid } from '@mui/material';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useMemo, useState } from 'react';
// import { getFile } from '../api/fileStorage';
import { getAllQuiz } from '../api/quiz';
import QuizCard from '../components/QuizCard';
import { BasePageProps } from '../types/props';
import { IQuizCoverFile, IQuizInfoResponse } from '../types/quiz';
import { bem } from '../utils/helpers';

const b = bem('quiz-catalog')

interface IQuizCatalog extends BasePageProps {}


const QuizCatalog: React.FC<IQuizCatalog> = () => {
    const [quizzes, setQuizzes] = useState<IQuizInfoResponse[] | null>(null)

    useEffect(() => {
        getAllQuizzes()
    }, [])

    const getAllQuizzes = async () => {
        const allQuizzes = await getAllQuiz()
        setQuizzes(allQuizzes)
    }

    useEffect(() => console.log(quizzes), [quizzes])

    return (
        <>            
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    
                </Grid>
                <Grid item xs={9}>

                    <Grid container spacing={2}>
                        {quizzes && quizzes.map((item, index) => {
                            return (
                                <Grid key={index} item xs={3}>
                                    <QuizCard quiz={item} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default inject('store')(observer(QuizCatalog));