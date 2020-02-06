import React, { Fragment, useState, KeyboardEvent, MouseEvent, useEffect } from 'react';
import './Modal.css';
import ModalTrigger from '../ModalTrigger/ModalTrigger';
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

    return (
        <Fragment>
            <ModalTrigger text={props.triggerText} onOpen={onOpen} />
            {isOpen &&
                <ModalContent onClose={onClose}>{props.children}</ModalContent>}
        </Fragment>
    );
}

export default Modal;
