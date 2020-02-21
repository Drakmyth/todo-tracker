import React from 'react';
import './AddListModal.scss';
import Modal from '../../Modal/Modal';
import CreateListForm from './CreateListForm/CreateListForm';

interface AddListModalProps {
    isOpen: boolean
    onCancel: () => void
    onConfirm: () => void
}

const AddListModal: React.FC<AddListModalProps> = (props) => {
  return (
      <Modal isOpen={props.isOpen} onEscapeKey={props.onCancel} onClickOutside={props.onCancel}>
        <CreateListForm />
        <section className="ModalButtons">
            <input type="button" value="Add List" onClick={props.onConfirm}/>
            <input type="button" value="Cancel" onClick={props.onCancel}/>
        </section>
      </Modal>
  );
}

export default AddListModal;
