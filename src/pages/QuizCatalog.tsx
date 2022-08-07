import { Grid } from '@mui/material';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useMemo, useState } from 'react';
import { getFile } from '../api/fileStorage';
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

    useEffect(() => console.log(cover), [cover])

    const filePath = useMemo(() => {
        if (cover && cover.destination && cover.filename) {
            // return 'localhost:7789/files/quizcover/174c2187-9b33-4253-acc8-4f139ddae024.jpeg'
            return `${process.env.API_URL}/${cover.destination}${cover.filename}`
        } else {
            return 'hello'
        }

    }, [cover])

    console.log(filePath)

    return (
        <>            
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    
                </Grid>
                <Grid className={b('main-block')} item xs={6}>
                    <img src={filePath} />
                </Grid>
                <Grid item xs={3}>
                    
                </Grid>
            </Grid>

        </>
    )
}

export default inject('store')(observer(QuizCatalog));