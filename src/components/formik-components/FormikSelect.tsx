import { useField } from 'formik';
import React, { useEffect } from 'react';
import FormikField from './FormikField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import { ISelectOptions } from '../../constants/selectsOptions';

interface IFormikSelect {
    name: string
    required?: boolean
    options: ISelectOptions[]
    label: string
}

const FormikSelect: React.FC<IFormikSelect> = ({ required, options, label,  ...props }) => {

    const [field, meta, helper] = useField(props)

    const caption = meta.touched && meta.error ? meta.error : null

    return (
        <FormikField label={label} caption={caption} required={required}>
            <Select
                fullWidth
                input={<Input {...field} {...props} />}
                >
                {options.map(item => <MenuItem key={item.name} value={item.id}>{item.translation}</MenuItem>)}
            </Select>

        </FormikField>
    )
}

export default FormikSelect;