import { Rate, message, notification } from "antd";
import ApiService from "../config/api/apiService"

const client = new ApiService();

class UseFetcher {
    get = async (setState, url="", page=1) => {
        try {
            const response = await client.get(url);
            if (response && response.data) {
                setState(prevState => ({
                    ...prevState,
                    isLoading: false,
                    data: [...prevState.data, ...response.data.results],
                    next: response.data.next,
                    page: prevState.page + 1,
                }))
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                isLoading: false,
                message: error.response.error
            }))
        }
    }

    retrieve = async (setState, url="") => {
        try {
            const response = await client.get(url);
            if (response && response.data) {
                setState(prevState => ({
                    ...prevState,
                    isLoading: false,
                    data: response.data,
                    success: true
                }))
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                isLoading: false,
                message: error.response.error,
                success: false
            }))
        }
    }

    

    post = async (url, setState, data) => {
        try {
            const response = await client.post(url, data);
            if (response && response.data) {
                setState(prevState => ({
                    ...prevState,
                    isLoading: false,
                    data: response.data || null,
                    message: response.data.message, 
                    success: true
                }))
            }
        } catch (error) {
            if(error.response.status >= 400 && error.response.status <= 499) {
                message.error("Provided data is invalided - Bad Request.")
            }
            setState(prevState => ({
                ...prevState,
                isLoading: false,
                message: error.response.data,
                success: false
            }))
        }
    }

    put = async (url, setState, data, onSuccess= () => {}, onFail) => {
        try {
            const response = await client.put(url, data);
            if (response && response.data) {
                setState(prevState => ({
                    ...prevState,
                    isLoading: false,
                    data: response.data || null,
                    message: response.data.message, 
                    success: true
                }))
                onSuccess();
            }
        } catch (error) {
            console.log(error.response)
            if(error.response.status >= 400 && error.response.status <= 499) {
                message.error("Provided data is valided - Bad Request.")
            }
            setState(prevState => ({
                ...prevState,
                isLoading: false,
                message: error.response.data,
                success: false
            }))
        }
    }
}


const loadSuccessNotitfication = (data) => {
    // ============> Load notification when success
    message.destroy();
    notification.open({
        message: (
        <Rate
            className="relative -top-[2px] flex items-center ltr:[&>li]:mr-0.5 rtl:[&>li]:ml-0.5 [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
            allowHalf
            defaultValue={data.review_data.rating}
            disabled
        />
        ),
        description: `${data.review_data.comment ||
        'Thank you for your valuable rating! Your feedback helps us improve our service.'}`,
    });
}

export default UseFetcher;