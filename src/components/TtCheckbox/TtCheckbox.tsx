import React, { useState } from 'react';
import './TtCheckbox.css';

interface TtCheckboxProps {
    label: string,
}

const TtCheckbox: React.FC<TtCheckboxProps> = ({ label }) => {
    const [selected, setSelected] = useState(false);

    const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(!selected);
        console.log(`${label} is now ${!selected}`)
    }

    return (
        <div className="TtCheckbox">
            <label>
                <input type="checkbox"
                    name={label}
                    checked={selected}
                    onChange={onCheckboxChange}
                    className="form-check-input" />
                {label}
            </label>
        </div>
    );
}

export default TtCheckbox;
