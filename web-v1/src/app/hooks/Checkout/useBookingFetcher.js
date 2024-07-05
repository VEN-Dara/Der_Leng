import { message, notification } from "antd";
import ApiService from "../../config/api/apiService";

const api = new ApiService()

const postBooking = async (data) => {
    try {
        const response = await api.post('/bookings', data);
        return response;
    } catch (error) {
        console.log(error.response)
        if(error?.response?.data?.errors === "['កាលបរិច្ឆេទដែលអ្នកចង់កក់មិននូវទំនេរទៀតទេ!']") {
            message.error("កាលបរិច្ឆេទដែលអ្នកចង់កក់មិននូវទំនេរទៀតទេ!")
        } else {
            notification.error({
                message: 'Failed Checkout!',
                description: `We apologize, but it seems there was an issue processing your order at this time. Please double-check your payment information and try again. If the problem persists, feel free to reach out to our customer support team for assistance. Thank you for your patience and understanding`,
            });
        }
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