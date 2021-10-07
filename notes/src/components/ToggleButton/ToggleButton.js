import React from 'react';
import { ToggleLabelStyle, ToggleInput, ToggleSpan } from './ToggleButtonStyle';

const ToggleButton = ({ onChange }) => {
    return (
        <ToggleLabelStyle>
            <ToggleInput type='checkbox' onChange={onChange} />
            <ToggleSpan />
        </ToggleLabelStyle>
    )
}

export default ToggleButton
