import { Rate, message, notification } from "antd";
import ApiService from "../../config/api/apiService"

const client = new ApiService();

const getReview = async (setState, package_id="", page=1) => {
    try {
        const response = await client.get(`/reviews?package=${package_id}&page=${page}`);
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

const postReview = async (setState, data) => {
    try {
        const response = await client.post('/reviews', data);
        if (response && response.data) {
            setState(prevState => ({
                ...prevState,
                isLoading: false,
                data: response.data.review_data,
                message: response.data.message
            }))
            loadSuccessNotitfication(response.data);
        }
    } catch (error) {
        if(error.response.status >= 400 && error.response.status <= 499) {
            message.error("Provided data is valided - Bad Request.")
        }
        setState(prevState => ({
            ...prevState,
            isLoading: false,
            message: error.response
        }))
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

export {postReview, getReview};