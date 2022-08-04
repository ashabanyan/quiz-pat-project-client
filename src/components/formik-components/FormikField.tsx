import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { bem } from '../../utils/helpers';

interface IFormikField {
    children: React.ReactNode
    label?: string
    caption?: string
    required?: boolean
}

const b = bem('formik-field');

const FormikField: React.FC<IFormikField> = ({ children, label, caption, required }) => {

    const inputLabel = required ? `${label} *` : label

    // className={b('label')

    return (
        <div className={b('container')}>
            <div className={b('label-block')}>
                <Typography variant="subtitle1">{inputLabel}</Typography>
                <Typography className={b('error')} >{caption}</Typography>
            </div>
            <div className={b('field')}>
                <div className={b('input')}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default FormikField;