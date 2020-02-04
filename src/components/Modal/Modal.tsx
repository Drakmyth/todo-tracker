import React, { Fragment, useState, KeyboardEvent, MouseEvent, useEffect } from 'react';
import './Modal.css';
import ModalTrigger from '../ModalTrigger/ModalTrigger';
import ModalContent from '../ModalContent/ModalContent';

interface ModalProps {
    triggerText: string
    role?: string
    ariaLabel: string
}

const Modal: React.FC<ModalProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalNode, setModalNode] = useState<HTMLDivElement>();
    const [closeButtonNode, setCloseButtonNode] = useState<HTMLButtonElement>();
    const [openButtonNode, setOpenButtonNode] = useState<HTMLButtonElement>();

    useEffect(() => {
        if (closeButtonNode) {
            closeButtonNode.focus();
        }
    }, [closeButtonNode]);

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => event.keyCode === 27 && setIsOpen(false);

    const onClickAway = (e: MouseEvent<HTMLElement>) => {
        if (!modalNode) return;
        if (modalNode.contains(e.target as HTMLElement)) return;
        setIsOpen(false);
    };

    const toggleScrollLock = () => document.querySelector('html')?.classList.toggle('u-lock-scroll');

    const onOpen = () => {
        setIsOpen(true);
        toggleScrollLock();
    };

    const onClose = () => {
        setIsOpen(false);
        openButtonNode?.focus()
        toggleScrollLock();
    };

    return (
        <Fragment>
            <ModalTrigger text={props.triggerText} onOpen={onOpen} buttonRef={(n) => setOpenButtonNode(n)}/>
            {isOpen && <ModalContent onClose={onClose}
                                     role={props.role || 'dialog'}
                                     ariaLabel={props.ariaLabel}
                                     onKeyDown={onKeyDown}
                                     onClickAway={onClickAway}
                                     modalRef={(n) => setModalNode(n)}
                                     buttonRef={(n) => setCloseButtonNode(n)}>{props.children}</ModalContent>}
        </Fragment>
    );
}

export default Modal;
