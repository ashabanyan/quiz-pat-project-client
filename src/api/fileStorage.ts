import ApiService from './apiService'

export const getFile = async () => {
    try {
        const { data } = await ApiService.get('/files/aaf09010-7e30-4cbb-84d3-beda44ee483e.jpeg')
        return data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}