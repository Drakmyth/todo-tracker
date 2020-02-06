import React, { useState } from 'react';
import './CreateListForm.css';
import { RootState } from '../../store/rootStore';
import { useSelector } from 'react-redux';

interface PotentialReasonMap {
    [key: string]: string
}

const CreateListForm: React.FC = () => {
    const existingSkipReasons = useSelector((state: RootState) => state.skipreasons)
    const [skipReasons, setSkipReasons] = useState<PotentialReasonMap>({})

    const existingReasonOptions = Object.keys(existingSkipReasons).map(key => existingSkipReasons[key].reason).filter((value, index, self) => self.indexOf(value) === index);

    return <form>
        <p>
            <label>Title</label><br />
            <input type="text" name="title" placeholder="e.g. My First List" />
        </p>
        <p>
            <label>Skip Reasons</label><br />
            <table>
                <tr>
                    <th>Reason</th>
                    <th>Color</th>
                </tr>
                {Object.keys(skipReasons).map(key => {
                    return <tr>
                        <td>{key}</td>
                        <td>{skipReasons[key]}</td>
                    </tr>
                })}
            </table>
            <select size={10}>
                {existingReasonOptions.map(key => {
                    return <option>{key}</option>
                })}
            </select><br />
            <button>Add Skip Reason</button><input type="text" name="new_skip_reason" placeholder="e.g. New Reason" />
        </p>
    </form>
}

export default CreateListForm;
