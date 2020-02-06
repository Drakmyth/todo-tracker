import React, { Fragment, useState } from 'react';
import './Modal.css';
import ModalContent from '../ModalContent/ModalContent';

interface ModalProps {
    triggerText: string
}

const Modal: React.FC<ModalProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const onCancel = () => {
        setIsOpen(false);
    }

    return (
        <Fragment>
            <button className="modalTrigger" onClick={onOpen}>{props.triggerText}</button>
            {isOpen &&
                <ModalContent onClose={onClose} onCancel={onCancel}>{props.children}</ModalContent>}
        </Fragment>
    );
}

export default Modal;
