import Typography from '@mui/material/Typography';
import React from 'react';
import { bem } from '../../utils/helpers';

interface IFormikField {
    children: React.ReactNode
    caption: string
}

const b = bem('formik-field');

const FormikField: React.FC<IFormikField> = ({ children, caption }) => {

    return (
        <div className={b('container')}>
            {children}
            <Typography className={b('error')} >{caption}</Typography>
        </div>
    )
}

export default FormikField;