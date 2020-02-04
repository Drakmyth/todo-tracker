import React from 'react';
import './ModalTrigger.css';

interface ModalTriggerProps {
    onOpen: () => void
    text: string
    buttonRef: (element: HTMLButtonElement) => void
}

const ModalTrigger: React.FC<ModalTriggerProps> = (props) => {

    return (
        <button className="c-btn" onClick={props.onOpen} ref={props.buttonRef}>{props.text}</button>
    );
}

export default ModalTrigger;
