import { IFullUser } from '../types/user';
import ApiService from './apiService'

export interface AnyObject {
    [key: string]: any;
  }

export const loginUser = async (email: string, password: string): Promise<IFullUser> => {
    try {
        const { data } = await ApiService.post('/login', { email, password })
        return data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const refreshToken = async(): Promise<IFullUser> => {
    try {
        const { data } = await ApiService.get('/refresh')
        return data
    } catch (error) {
        console.error(error.message)
    }
}

export const logout = async(): Promise<void> => {
    try {
        const { data } = await ApiService.post('/logout')
        localStorage.removeItem('accessToken')
        return data
    } catch (error) {
        console.error(error.message)
    }
}