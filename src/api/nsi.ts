import { ISelectOptions } from '../constants/selectsOptions'
import { IQuizLevel, IQuizCategories } from '../types/quiz'
import ApiService from './apiService'

export const getQuizLevels = async (): Promise<ISelectOptions[]> => {
    try {
       const { data } = await ApiService.get('/nsi/levels')
       return data
    } catch (error) {
        
    }
}

export const getQuizCategories = async (): Promise<IQuizCategories[]> => {
    try {
       const { data } = await ApiService.get('/nsi/categories')
       return data
    } catch (error) {
        
    }
}