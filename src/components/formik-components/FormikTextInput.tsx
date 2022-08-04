import TextField from '@mui/material/TextField';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import FormikField from './FormikField';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Input } from '@mui/material';
import { bem } from '../../utils/helpers';

const b = bem('formik-text-input')

interface IFormikInput {
    name: string
    placeholder?: string
    label: string
    type?: string
    required?: boolean
}

const FormikTextInput: React.FC<IFormikInput> = ({ label, type, required, ...props }) => {

    const [field, meta] = useField(props)

    const caption = meta.touched && meta.error ? meta.error : null

    console.log(b())
    

    return (
        <FormikField label={label} caption={caption} required={required}>
            <Input 
                className={b()}
                fullWidth
                type={type ?? 'text'}
                {...field}
                {...props}
            />
        </FormikField>
    )
}

export default FormikTextInput;