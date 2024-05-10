import { message } from "antd";
import { DataService } from "../../config/dataService/dataService"

const getCart = async (setState) => {
    try {
        const response = await DataService.get("/carts");
        if (response.status === 200) {
            setState(prevState => ({
                ...prevState,
                carts: response.data,
                isLoader: false
            }));
        }
    } catch (error) {
        setState(prevState => ({
            ...prevState,
            isLoader: false
        }));
    }
};


const postCart = async (cart) => {
    try {
        const response = await DataService.post("/carts", cart);
        // if (response.status === 200) {
        //     message.success("Package add to cart successfully.")
        // }
        return response.status === 200;
    } catch (error) {
        console.log(error)
        return false;
    }
}

const putCart = async (cart) => {
    try {
        const response = await DataService.put(`/carts/${cart.id}`, cart);
        if (response.status === 200) {
            message.success("Package Update to cart successfully.")
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteCart = async (id) => {
    try {
        const response = await DataService.delete(`/carts/${id}`);
    } catch (error) {
        console.log(error)
    }
}
export { postCart, getCart, putCart, deleteCart };