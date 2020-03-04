import React, { useState } from 'react';
import Modal from '../../Modal/Modal';
import CreateListForm from './CreateListForm/CreateListForm';

interface AddListModalProps {
  isOpen: boolean
  onCancel: () => void
  onConfirm: (title: string, complete_color: string, incomplete_color: string, skipReasons: ReasonColorMap) => void
}

const AddListModal: React.FC<AddListModalProps> = (props) => {
  const [skipReasons, setSkipReasons] = useState<ReasonColorMap>({});
  const [title, setTitle] = useState('');
  const [completeColor, setCompleteColor] = useState('#000000');
  const [incompleteColor, setIncompleteColor] = useState('#000000');
  const [showTitleValidation, setShowTitleValidation] = useState(false);

  const validateAndConfirmForm = () => {
    if (title.length <= 0) {
      setShowTitleValidation(true);
      return;
    }

    props.onConfirm(title, completeColor, incompleteColor, skipReasons);
  }

  return (
    <Modal isOpen={props.isOpen}
      onEscapeKey={props.onCancel}
      onClickOutside={props.onCancel}
      confirmButtonText="Add List"
      onConfirm={validateAndConfirmForm}
      cancelButtonText="Cancel"
      onCancel={props.onCancel}>
      <CreateListForm skipReasons={skipReasons}
        onSkipReasonChange={setSkipReasons}
        title={title}
        showTitleValidation={showTitleValidation}
        onTitleChange={setTitle}
        completeColor={completeColor}
        onCompleteColorChange={setCompleteColor}
        incompleteColor={incompleteColor}
        onIncompleteColorChange={setIncompleteColor} />
    </Modal>
  );
}

export default AddListModal;
