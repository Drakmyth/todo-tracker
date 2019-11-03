import React, { useState } from 'react';
import './TtTextbox.css';

interface TtTextboxProps {
    initialText: string,
    onTextboxCommit: (text: string) => void
}

const TtTextbox: React.FC<TtTextboxProps> = ({ initialText, onTextboxCommit }) => {
    const [text, setText] = useState(initialText);

    const onTextboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    const onTextboxLostFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        onTextboxCommit(text);
    }

    const onTextboxKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onTextboxCommit(text)
        }
    }

    return (
        <div className="TtTextbox">
            <input type="text"
                value={text}
                onChange={onTextboxChange}
                className="form-check-input"
                autoFocus
                onBlur={onTextboxLostFocus}
                onKeyDown={onTextboxKeyDown} />
        </div>
    );
}

export default TtTextbox;
