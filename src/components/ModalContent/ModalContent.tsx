import React from 'react';
import './ModalContent.css';
import ReactDOM from 'react-dom';
import { FocusOn } from 'react-focus-on';

interface ModalContentProps {
    onClose: () => void
    onCancel: () => void
}

const ModalContent: React.FC<ModalContentProps> = (props) => {

    return ReactDOM.createPortal(
        <aside className="modalCover">
            <FocusOn onEscapeKey={props.onCancel} onClickOutside={props.onCancel}>
                <div className="modal">
                    <button className="modalClose" onClick={props.onClose}>
                        <svg viewBox="0 0 40 40">
                            <path d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
                        </svg>
                    </button>
                    <div className="modalBody">
                        {props.children}
                    </div>
                </div>
            </FocusOn>
        </aside>, document.body
    );
}

export default ModalContent;
