import React, { useState } from 'react';
import './CreateListForm.scss';
import ColorPicker from '../../../ColorPicker/ColorPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PotentialReasonMap {
    [reason: string]: string  // [reason]: color
}

const CreateListForm: React.FC = () => {
    const [skipReasons, setSkipReasons] = useState<PotentialReasonMap>({})
    const [color, setColor] = useState('#000000')
    const [reasonText, setReasonText] = useState('')

    const addSkipReason = () => {
        if (reasonText === '') return;

        setSkipReasons({
            ...skipReasons,
            [reasonText]: color
        });

        setReasonText('');
        setColor('#000000');
    }

    const updateExistingColor = (reason: string, color: string) => {
        setSkipReasons({
            ...skipReasons,
            [reason]: color
        });
    }

    const deleteSkipReason = (reason: string) => {
        const clone = { ...skipReasons };
        delete clone[reason];
        setSkipReasons(clone);
    }

    return <form className="CreateListForm">
        <section className="ListProperties">
            <label>Title</label><br />
            <input type="text" name="title" placeholder="e.g. My First List" />
        </section>
        <section className="SkipReasons">
            <label>Skip Reasons</label><br />
            <table>
                <thead>
                    <tr>
                        <th>Reason</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(skipReasons).map((reason, index) => {
                        return <tr key={index}>
                            <td>{reason}</td>
                            <td><ColorPicker color={skipReasons[reason]} onChange={(c) => updateExistingColor(reason, c)} /></td>
                            <td><FontAwesomeIcon icon="trash" onClick={() => deleteSkipReason(reason)} /></td>
                        </tr>
                    })}
                    <tr>
                        <td>
                            <input type="text" value={reasonText} onChange={(event) => setReasonText(event.target.value)} placeholder="e.g. My Reason" />
                        </td>
                        {/* <td>
                            <ColorPicker color={color} onChange={(c) => setColor(c)} />
                        </td> */}
                    </tr>
                </tbody>
            </table>
            <input type="button" value="Add Skip Reason" onClick={addSkipReason} />
        </section>
    </form>
}

export default CreateListForm;
