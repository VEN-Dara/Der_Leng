import { message } from "antd";
import ApiService from "../../config/dataService/apiService"

const api = new ApiService();

const getPaymentMethod = async (setState) => {

    try {
        const response = await api.get('/payments');
        if(response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                data: response.data,
                isLoading: false
            }))
        }
    } catch (error) {
        setState((prevState) => ({
            ...prevState,
            isLoading: false
        }))
        console.error("Get payment", error)
        console.log(error.response)
    }
}

const deletePaymentMedthod = async (id) => {
    message.loading("កាតកំពុងលុបចេញ...🗑️", 1000 * 30)
    try {
        const response = await api.delete(`/payments/${id}`);
        return response;
    } catch (error) {
        console.log(error)
        return error.response;
    } finally {
        message.destroy()
    }
}

export {getPaymentMethod, deletePaymentMedthod}