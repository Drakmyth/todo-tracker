import React from 'react';
import './ModalTrigger.css';

interface ModalTriggerProps {
    onOpen: () => void
    text: string
}

const ModalTrigger: React.FC<ModalTriggerProps> = (props) => {

    return (
        <button className="c-btn" onClick={props.onOpen}>{props.text}</button>
    );
}

export default ModalTrigger;
