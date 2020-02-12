import React, { useState, useEffect, MouseEvent } from 'react';
import './ColorPicker.scss';
import { SketchPicker } from 'react-color';
import ReactDOM from 'react-dom';

interface ColorPickerProps {
    color: string
    onChange: (color: string) => void
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [color, setColor] = useState(props.color)
    const [previousColor, setPreviousColor] = useState(props.color)

    const popover_ref = React.createRef<HTMLDivElement>();

    useEffect(() => {
        setPreviousColor(props.color);
        setColor(props.color);
    }, [props.color]);

    const openPicker = () => {
        setDisplayColorPicker(true);
    }

    const pickColor = (event: MouseEvent<HTMLElement>) => {
        setDisplayColorPicker(false);
        props.onChange(color)
    }
    
    const cancelColor = (event: MouseEvent<HTMLElement>) => {
        setDisplayColorPicker(false);
        setColor(previousColor);
    }
    
    const cancelClickAway = (event: MouseEvent<HTMLElement>) => {
        if (event.target !== popover_ref.current) {
            event.stopPropagation();
            return;
        }
        cancelColor(event);
    }

    return <div className="ColorPicker">
        <div className="cp-preview" onClick={openPicker} style={{ background: color }}></div>
        <span className="cp-hex">{color}</span>
        {displayColorPicker &&
            ReactDOM.createPortal(
                <div className="popover" ref={popover_ref} onClick={cancelClickAway}>
                    <div className="color-picker-modal">
                        <SketchPicker color={color} onChange={(c) => setColor(c.hex)} />
                        <div className="color-picker-buttons">
                            <button onClick={pickColor}>Apply</button>
                            <button onClick={cancelColor}>Cancel</button>
                        </div>
                    </div>
                </div>, document.body
            )
        }
    </div>
}

export default ColorPicker;
