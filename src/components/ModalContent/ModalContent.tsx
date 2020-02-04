import React, { KeyboardEvent, MouseEvent } from 'react';
import './ModalContent.css';
import ReactDOM from 'react-dom';

interface ModalContentProps {
    onClose: () => void
    onClickAway: (e:MouseEvent<HTMLElement>) => void
    role?: string
    ariaLabel: string
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
    modalRef: (element: HTMLDivElement) => void
    buttonRef: (element: HTMLButtonElement) => void
}

const ModalContent: React.FC<ModalContentProps> = (props) => {

    const modalCoverProps = {
        className: "c-modal-cover",
        tabIndex: -1,
        onKeyDown: props.onKeyDown,
        onClick: props.onClickAway,
        role: props.role || 'dialog'
    }

    return ReactDOM.createPortal(
        <aside {...modalCoverProps} aria-modal="true" aria-label={props.ariaLabel}>
            <div className="c-modal" ref={props.modalRef}>
                <button className="c-modal__close" onClick={props.onClose} aria-label="Close Modal" ref={props.buttonRef}>
                    <svg className="c-modal__close-icon" viewBox="0 0 40 40">
                        <path d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
                    </svg>
                </button>
                <div className="c-modal__body">
                    {props.children}
                </div>
            </div>
        </aside>, document.body
    );
}

export default ModalContent;
