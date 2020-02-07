import React, { useState } from 'react';
import './CreateListForm.scss';
import { RootState } from '../../store/rootStore';
import { useSelector } from 'react-redux';
import ColorPicker from '../ColorPicker/ColorPicker';

interface PotentialReasonMap {
    [key: string]: string
}

const CreateListForm: React.FC = () => {
    const existingSkipReasons = useSelector((state: RootState) => state.skipreasons)
    const [skipReasons, setSkipReasons] = useState<PotentialReasonMap>({})
    const [color, setColor] = useState('#000000')
    const [reasonText, setReasonText] = useState('')

    const existingReasonOptions = Object.keys(existingSkipReasons).map(key => existingSkipReasons[key].reason).filter((value, index, self) => self.indexOf(value) === index);

    const addSkipReason = () => {
        if (reasonText === '') return;

        setSkipReasons({
            ...skipReasons,
            [reasonText]: color
        });

        setReasonText('');
        setColor('#000000');
    }

    return <form className="CreateListForm">
        {/* <p> */}
            <label>Title</label><br />
            <input type="text" name="title" placeholder="e.g. My First List" />
        {/* </p> */}
        <label>Skip Reasons</label><br />
        <table>
            <thead>
                <tr>
                    <th>Reason</th>
                    <th>Color</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(skipReasons).map((key, index) => {
                    return <tr key={index}>
                        <td>{key}</td>
                        <td>{skipReasons[key]}</td>
                    </tr>
                })}
            </tbody>
        </table>
        <input type="text" value={reasonText} onChange={(event) => setReasonText(event.target.value)} placeholder="e.g. My Reason" />
        <ColorPicker color={color} onChange={(c) => setColor(c)}/>
        <input type="button" value="Add Skip Reason" onClick={addSkipReason} />
    </form>
}

export default CreateListForm;
