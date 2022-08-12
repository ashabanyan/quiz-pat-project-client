import { Grid } from '@mui/material';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useMemo, useState } from 'react';
// import { getFile } from '../api/fileStorage';
import { getOneQuiz, getQuizCover } from '../api/quiz';
import { BasePageProps } from '../types/props';
import { bem } from '../utils/helpers';

const b = bem('quiz-catalog')

interface IQuizCatalog extends BasePageProps {}

export interface ICover {
    destination: string
    extension: string
    filename: string
    id: number
    originalname: string
    size: number
}

const QuizCatalog: React.FC<IQuizCatalog> = () => {
    const [quiz, setQuiz] = useState()
    const [cover, setCover] = useState<ICover>()


    useEffect(() => {
        getQuiz()
    }, [])

    const getQuiz = async () => getOneQuiz().then(res => {
        setQuiz(res)
        getCover().then(res => setCover(res))
    })

    const getCover = async () => getQuizCover()

    return (
        <>            
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    
                </Grid>
                <Grid className={b('main-block')} item xs={6}>
                </Grid>
                <Grid item xs={3}>
                    
                </Grid>
            </Grid>

        </>
    )
}

export default inject('store')(observer(QuizCatalog));