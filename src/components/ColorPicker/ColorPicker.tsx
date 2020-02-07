import React, { useState, Fragment, useEffect } from 'react';
import './ColorPicker.css';
import { SketchPicker } from 'react-color';
import Modal from '../Modal/Modal';

interface ColorPickerProps {
    color: string
    onChange: (color: string) => void
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [color, setColor] = useState(props.color)
    const [previousColor, setPreviousColor] = useState(props.color)

    useEffect(() => {
        setPreviousColor(props.color);
        setColor(props.color);
    }, [props.color]);

    const openPicker = () => {
        setDisplayColorPicker(true);
    }

    const pickColor = () => {
        setDisplayColorPicker(false);
        props.onChange(color)
    }

    const cancelColor = () => {
        setDisplayColorPicker(false);
        setColor(previousColor);
    }

    return <div className="ColorPicker">
        <div className="cp-preview" onClick={openPicker} style={{ background: color }}></div>
        <span className="cp-hex">{color}</span>
        {displayColorPicker &&
            <Modal show={displayColorPicker} onClose={pickColor} onCancel={cancelColor}>
                <SketchPicker color={color} onChange={(c) => setColor(c.hex)} />
            </Modal>
        }
    </div>
}

export default ColorPicker;
