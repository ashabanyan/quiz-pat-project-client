import { IQuizCoverFile, IQuizInfoResponse, IQuizRequest } from '../types/quiz'
import ApiService from './apiService'

export const getAllQuiz = async (): Promise<IQuizInfoResponse[]> => {
    try {
        const { data } = await ApiService.get('/quiz')
        return data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const getOneQuiz = async () => {
    try {
        const { data } = await ApiService.get('/quiz/1')
        return data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const getQuizCover = async (): Promise<IQuizCoverFile> => {
    try {
        const { data } = await ApiService.get('/quizcover/1')
        return data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const createQuizInfo = async (quizObject: IQuizRequest) => {
    try {
        const { data } = await ApiService.post('/quiz', quizObject)
    } catch (error) {
        console.log(error)
    }
}