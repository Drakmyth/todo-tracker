import React, { Fragment } from 'react';
import './Modal.scss';
import ReactDOM from 'react-dom';
import { FocusOn } from 'react-focus-on';

interface ModalProps {
    isOpen: boolean
    onEscapeKey: () => void
    onClickOutside: () => void
    cover? : boolean
}

const Modal: React.FC<ModalProps> = (props) => {

    if (!props.isOpen) return <Fragment></Fragment>;

    return ReactDOM.createPortal(
        <section className={(props.cover ?? true) ? "ModalCover" : ""}>
            <FocusOn onEscapeKey={props.onEscapeKey} onClickOutside={props.onClickOutside}>
                <div className="Modal">
                    {props.children}
                </div>
            </FocusOn>
        </section>, document.body
    );
}

export default Modal;
