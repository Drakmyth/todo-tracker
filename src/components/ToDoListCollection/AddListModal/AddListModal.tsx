import React, { useState } from 'react';
import './AddListModal.scss';
import Modal from '../../Modal/Modal';
import CreateListForm from './CreateListForm/CreateListForm';

interface AddListModalProps {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
}

const AddListModal: React.FC<AddListModalProps> = (props) => {
  const [skipReasons, setSkipReasons] = useState<ReasonColorMap>({});
  const [title, setTitle] = useState('');
  const [completeColor, setCompleteColor] = useState('#000000');
  const [incompleteColor, setIncompleteColor] = useState('#000000');

  const temp = () => {
    console.log(skipReasons);
    console.log(title);
  }

  return (
    <Modal isOpen={props.isOpen} onEscapeKey={props.onCancel} onClickOutside={props.onCancel}>
      <CreateListForm skipReasons={skipReasons}
        onSkipReasonChange={setSkipReasons}
        title={title}
        onTitleChange={setTitle}
        completeColor={completeColor}
        onCompleteColorChange={setCompleteColor}
        incompleteColor={incompleteColor}
        onIncompleteColorChange={setIncompleteColor} />
      <section className="ModalButtons">
        <input type="button" value="Add List" onClick={temp} />
        <input type="button" value="Cancel" onClick={props.onCancel} />
      </section>
    </Modal>
  );
}

export default AddListModal;
