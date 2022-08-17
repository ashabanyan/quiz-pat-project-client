import { Grid } from '@mui/material';
import React from 'react';
import FormikTextInput from './FormikTextInput';

interface IFormikDoubleTextInput {
    leftName: string
    rightName: string
    leftLabel: string
    rigthLabel: string
    required: boolean
}

const FormikDoubleTextInput: React.FC<IFormikDoubleTextInput> = ({ leftName, rightName, leftLabel, rigthLabel }) => {
    return (
        <>
            <Grid item xs={6}>
                <FormikTextInput
                    name={leftName}
                    label={leftLabel}
                    type="text"
                    required
                />
            </Grid>

            <Grid item xs={6}>
                <FormikTextInput
                    name={rightName}
                    label={rigthLabel}
                    type="text"
                    required
                />
            </Grid>                                                                                
        </>
    )
}

export default FormikDoubleTextInput;