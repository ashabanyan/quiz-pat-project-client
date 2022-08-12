import { FieldHelperProps, FieldInputProps, useField } from 'formik';
import React, { useEffect } from 'react';
import FormikField from './FormikField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import { ISelectOptions } from '../../constants/selectsOptions';
import { CompressOutlined } from '@mui/icons-material';

interface IFormikSelect {
    name: string
    required?: boolean
    options: ISelectOptions[]
    label: string
    values?: any
    onChangeFunc?: 
        (e: SelectChangeEvent<any>, 
        field: FieldInputProps<any>, 
        values: any, 
        setValues: (value: any, shouldValidate?: boolean) => void) => void
    setValues?: (values: any, shouldValidate?: boolean) => void
}

const FormikSelect: React.FC<IFormikSelect> = ({ required, options, label, values, onChangeFunc, setValues,  ...props }) => {

    const [field, meta, helper] = useField(props)

    const caption = meta.touched && meta.error ? meta.error : null

    const handleChange = (e: SelectChangeEvent<any>) => {
        onChangeFunc(e, field, values, setValues)
    }

    const selectDefaultProps = {
        value: field.value ?? '',
        fullWidth: true,
        input: <Input {...field} {...props} />
    } 

    const selectProps = !!onChangeFunc 
        ? { ...selectDefaultProps, onChange: (e: SelectChangeEvent<any>) => handleChange(e)} 
        : selectDefaultProps 

    return (
        <FormikField label={label} caption={caption} required={required}>
            <Select {...selectProps}>
                {options.map(item => <MenuItem key={item.id} value={item.id}>{item.translation ?? item.id}</MenuItem>)}
            </Select>
        </FormikField>
    )
}

export default FormikSelect;