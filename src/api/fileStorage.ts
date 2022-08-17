import axios from 'axios'
import { IQuizCoverFile } from '../types/quiz'
import ApiService from './apiService'

export const saveImage = async (file: File): Promise<IQuizCoverFile> => {
    try {
        const formData = new FormData()
        formData.append('file', file)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const { data } = await ApiService.post('/saveimage', formData, config )

       return data
    } catch (error) {
        console.log('Ошибка ----- ', error)
    }
}

// export const getFile = async () => {
//     try {
//         const { data } = await ApiService.get('/files/aaf09010-7e30-4cbb-84d3-beda44ee483e.jpeg')
//         return data
//     } catch (error) {
//         throw new Error(error.response.data.message)
//     }
// }