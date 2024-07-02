import {lazy} from 'react';
import { Modal } from "antd";
const Ordersummary = lazy(() => import('./Ordersummary'));
function CheckOutModal({ handleOk, handleCancel, visible, subtotal, subDiscountPrice }) {
    
    return (
        <Modal
            type="danger"
            color
            title="Pay now!"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Ordersummary subtotal={subtotal} discount={subDiscountPrice} checkout={true} />
        </Modal>
    )
}

export default CheckOutModal
