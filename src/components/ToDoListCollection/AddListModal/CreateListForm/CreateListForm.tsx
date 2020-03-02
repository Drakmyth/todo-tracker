import React, { useState } from 'react';
import ColorPicker from '../../../ColorPicker/ColorPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CreateListFormProps {
    title: string
    showTitleValidation: boolean
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

    return <form className="modal-form">
        <fieldset>
            <legend>List Properties:</legend>
            <div className="form-field">
                <label htmlFor="list-title">Title:</label>
                <input id="list-title"
                    className="form-input form-input--standard"
                    type="text"
                    value={props.title}
                    onChange={(event) => props.onTitleChange(event.target.value)}
                    placeholder="e.g. My First List" />
                {
                    props.showTitleValidation &&
                    <span className="validation-error">*Required</span>
                }
            </div>
            <div className="form-field">
                <label>Complete Color:</label>
                <ColorPicker className="form-input form-input--standard" color={props.completeColor} onChange={props.onCompleteColorChange} />
            </div>
            <div className="form-field">
                <label>Incomplete Color:</label>
                <ColorPicker className="form-input form-input--standard" color={props.incompleteColor} onChange={props.onIncompleteColorChange} />
            </div>
        </fieldset>
        <fieldset>
            <legend>Skip Reasons:</legend>
            <table className="table--skip-reasons">
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
        </fieldset>
    </form>
}

export default CreateListForm;
