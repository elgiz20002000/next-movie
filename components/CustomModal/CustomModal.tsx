import { useDispatch } from "react-redux"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import { hideModal } from "../../Store/ModalSlice"


const CustomModal = ({modal_text, modalActive}) => {
    const dispatch = useDispatch()

  return (
    <Modal isOpen={modalActive}>
    <ModalHeader toggle={() => dispatch(hideModal()) } className="custom-modal">Message</ModalHeader>
    <ModalBody className="custom-modal">
      {modal_text}
    </ModalBody>
  </Modal>
  )
}

export default CustomModal