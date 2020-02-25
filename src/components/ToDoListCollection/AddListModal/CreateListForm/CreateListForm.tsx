import React, { useState } from 'react';
import './CreateListForm.scss';
import ColorPicker from '../../../ColorPicker/ColorPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CreateListFormProps {
    title: string
    skipReasons: ReasonColorMap
    completeColor: string
    incompleteColor: string
    onSkipReasonChange: (skipReasons: ReasonColorMap) => void
    onTitleChange: (title: string) => void
    onCompleteColorChange: (completeColor: string) => void
    onIncompleteColorChange: (incompleteColor: string) => void
}

const CreateListForm: React.FC<CreateListFormProps> = (props) => {
    const [reasonText, setReasonText] = useState('');

    const addSkipReason = () => {
        if (reasonText === '') return;

        props.onSkipReasonChange({
            ...props.skipReasons,
            [reasonText]: '#000000'
        });

        setReasonText('');
    }

    const updateExistingColor = (reason: string, color: string) => {
        props.onSkipReasonChange({
            ...props.skipReasons,
            [reason]: color
        });
    }

    const deleteSkipReason = (reason: string) => {
        const clone = { ...props.skipReasons };
        delete clone[reason];
        props.onSkipReasonChange(clone);
    }

    return <form className="CreateListForm">
        <div className="ListProperties">
            <div className="ListField">
                <label htmlFor="list-title">Title:</label>
                <input id="list-title"
                    type="text"
                    value={props.title}
                    onChange={(event) => props.onTitleChange(event.target.value)}
                    placeholder="e.g. My First List" />
                <span className="validation-error">*Required</span>
            </div>
            <div className="ListField">
                <span>Complete Color:</span>
                <ColorPicker color={props.completeColor} onChange={props.onCompleteColorChange} />
            </div>
            <div className="ListField">
                <span>Incomplete Color:</span>
                <ColorPicker color={props.incompleteColor} onChange={props.onIncompleteColorChange} />
            </div>
        </div>
        <div className="SkipReasons">
            <span>Skip Reasons:</span>
            <table>
                <thead>
                    <tr>
                        <th>Reason</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(props.skipReasons).map((reason, index) => {
                        return <tr key={index} className="skip-reason-row">
                            <td>{reason}</td>
                            <td><ColorPicker color={props.skipReasons[reason]} onChange={(c) => updateExistingColor(reason, c)} /></td>
                            <td className="skip-reason-trash-button"><FontAwesomeIcon icon="trash" onClick={() => deleteSkipReason(reason)} /></td>
                        </tr>
                    })}
                    <tr>
                        <td>
                            <input type="text" value={reasonText} onChange={(event) => setReasonText(event.target.value)} placeholder="e.g. My Reason" />
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <input type="button" value="Add Skip Reason" onClick={addSkipReason} />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </form>
}

export default CreateListForm;
