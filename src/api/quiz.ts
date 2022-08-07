import { ICover } from '../pages/QuizCatalog'
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