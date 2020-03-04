import React, { useState, useEffect, MouseEvent, useRef } from 'react';
import { SketchPicker } from 'react-color';
import ReactDOM from 'react-dom';
import joinClasses from '../../utilities/joinClasses';

interface ColorPickerProps {
    color: string
    onChange: (color: string) => void
    className?: string
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [pickerPosition, setPickerPosition] = useState([0,0])
    const [color, setColor] = useState(props.color)
    const [previousColor, setPreviousColor] = useState(props.color)

    const popover_ref = useRef<HTMLDivElement>(null);
    const picker_preview_ref = useRef<HTMLDivElement>(null);
    const picker_modal_ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setPreviousColor(props.color);
        setColor(props.color);
    }, [props.color]);

    useEffect(() => {
        const rect = picker_preview_ref.current?.getBoundingClientRect() ?? {left: 0, top:0};
        const top = rect.top - (picker_modal_ref.current?.getBoundingClientRect()?.height ?? 0);
        setPickerPosition([rect.left, top])
    }, [displayColorPicker])

    const openPicker = (event: MouseEvent<HTMLElement>) => {
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

    return <div className={joinClasses("color-picker", props.className)}>
        <div className="color-picker-preview" ref={picker_preview_ref} onClick={openPicker} style={{ background: previousColor }}></div>
        <span className="color-picker-value">{previousColor}</span>
        {displayColorPicker &&
            ReactDOM.createPortal(
                <div className="modal-cover" ref={popover_ref} onClick={cancelClickAway}>
                    <div className="color-picker-modal modal--color-picker" ref={picker_modal_ref} style={{left: pickerPosition[0], top: pickerPosition[1]}}>
                        <SketchPicker color={color} onChange={(c) => setColor(c.hex)} />
                        <div className="modal-buttons modal-buttons--color-picker">
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
