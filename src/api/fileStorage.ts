import axios from 'axios'
import ApiService from './apiService'

export const saveFile = async (file: File) => {
    try {
        console.log('Дошло')
        const formData = new FormData()
        formData.append('file', file)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('http://localhost:7789/api/quizcover', formData, config)
        console.log(data)
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