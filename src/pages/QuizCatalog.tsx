import { Grid } from '@mui/material';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useMemo, useState } from 'react';
// import { getFile } from '../api/fileStorage';
import { getAllQuiz } from '../api/quiz';
import { BasePageProps } from '../types/props';
import { IQuizInfoResponse } from '../types/quiz';
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

                {/* <img src={`${process.env.API_URL}/files/images/d99be675-3d8a-4cd8-b8c9-d2051f878f7b.jpeg`} /> */}

                {quizzes && <Grid className={b('main-block')} item xs={9}>
                    {quizzes.map(item => <img src={`${process.env.API_URL}/${item.cover.destination}${item.cover.filename}`} />)}
                </Grid>}
            </Grid>

        </>
    )
}

export default inject('store')(observer(QuizCatalog));