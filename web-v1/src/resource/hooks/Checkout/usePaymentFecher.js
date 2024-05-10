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
        alert(error.response)
    }
}

const deletePaymentMedthod = async (id) => {
    try {
        const response = await api.delete(`/payments/${id}`);
        return response;
    } catch (error) {
        return error.response;
        console.log(error)
    }
}

export {getPaymentMethod, deletePaymentMedthod}