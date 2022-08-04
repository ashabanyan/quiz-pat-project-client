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
}

const FormikSelect: React.FC<IFormikSelect> = ({ required, options,  ...props }) => {

    const [field, meta, helper] = useField(props)

    const caption = meta.touched && meta.error ? meta.error : null

    return (
        <FormikField label="Роль" caption={caption} required={required}>
            <Select
                fullWidth
                input={<Input {...field} {...props} />}
                >
                {options.map(item => <MenuItem key={item.name} value={item.name}>{item.translation}</MenuItem>)}
            </Select>

        </FormikField>
    )
}

export default FormikSelect;