import ApiService from "../../config/dataService/apiService";

const api = new ApiService()

const postBooking = async (data) => {
    try {
        const response = await api.post('/bookings', data);
        return response;
    } catch (error) {
        console.log(error.response)
        return error.response;
    }
} 

const getBooking = async (setState) => {
    try {
        const response = await api.get('/bookings')
        if(response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                isLoader: false,
                data: response.data
            }))
        }
    } catch (error) {
        console.log(error.response)
    }
} 

export {postBooking, getBooking}