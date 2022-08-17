import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { IQuizCoverFile, IQuizInfoResponse } from '../types/quiz';

const getFilePath = (cover: IQuizCoverFile): string => `${process.env.API_URL}/${cover.destination}${cover.filename}`

interface IQuizCard {
    quiz: IQuizInfoResponse
}

const QuizCard: React.FC<IQuizCard> = ({ quiz }) => {
    const history = useHistory()
    const { id, name, cover } = quiz

    const imagePath = getFilePath(cover)

    const onPlayHandle = () => history.push(`/quiz/play/${id}`)
    
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={imagePath}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography> */}
            </CardContent>
            <CardActions>
                <Button onClick={onPlayHandle} size="small">Играть</Button>
                {/* <Button size="small">Learn More</Button> */}
            </CardActions>
        </Card>
    )
}

export default QuizCard