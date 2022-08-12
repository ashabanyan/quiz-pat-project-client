import { ICover } from '../pages/QuizCatalog'
import { IQuizInfoReq } from '../types/quiz'
import ApiService from './apiService'

export const getOneQuiz = async () => {
    try {
        const { data } = await ApiService.get('/quiz/1')
        return data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const getQuizCover = async (): Promise<ICover> => {
    try {
        const { data } = await ApiService.get('/quizcover/1')
        return data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const createQuizInfo = async (quizInfoObj: IQuizInfoReq) => {
    try {
        const { data } = await ApiService.post('/quizinfo', quizInfoObj)
    } catch (error) {
        
    }
}