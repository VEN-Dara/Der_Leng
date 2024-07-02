import { Modal } from "antd"
  // =====================> Modal Delete <=====================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCartId, setDeleteCartId] = useState(null);

  const handleOk = () => {
    console.log(deleteCartId)
    deleteCart(deleteCartId);
    setIsModalOpen(false)
    setRefreshData(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false)
  };

  const showModal = (id) => {
    setDeleteCartId(id)
    setIsModalOpen(true)
  };
  
function CartDeleteModal({ handleOk, handleCancel, visible }) {
    return (
        <Modal
            type="danger"
            color
            title="Basic Modal"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div className="dark:text-white60">
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </div>
        </Modal>
    )
}

export default CartDeleteModal