import React, { Fragment } from 'react';
import './Modal.scss';
import ReactDOM from 'react-dom';
import { FocusOn } from 'react-focus-on';
import joinClasses from '../../utilities/joinClasses';

interface ModalProps {
    isOpen: boolean
    onEscapeKey: () => void
    onClickOutside: () => void
    confirmButtonText?: string
    onConfirm?: () => void
    cancelButtonText?: string
    onCancel?: () => void
    cover?: boolean
    modalStyleClass?: string
    buttonsStyleClass?: string
}

const Modal: React.FC<ModalProps> = (props) => {

    if (!props.isOpen) return <Fragment></Fragment>;

    return ReactDOM.createPortal(
        <section className={(props.cover ?? true) ? "modal-cover modal-cover--standard" : ""}>
            <FocusOn onEscapeKey={props.onEscapeKey} onClickOutside={props.onClickOutside}>
                <div className={joinClasses("modal", props.modalStyleClass || "modal--standard")}>
                    {props.children}
                    <section className={joinClasses("modal-buttons", props.buttonsStyleClass || "modal-buttons--standard")}>
                        {
                            props.confirmButtonText &&
                            <input type="button" value={props.confirmButtonText} onClick={props.onConfirm} />
                        }
                        {
                            props.cancelButtonText &&
                            <input type="button" value={props.cancelButtonText} onClick={props.onCancel} />
                        }
                    </section>
                </div>
            </FocusOn>
        </section>, document.body
    );
}

export default Modal;
