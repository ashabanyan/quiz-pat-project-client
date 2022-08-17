import React from 'react';
import { Field, FieldInputProps, useField } from 'formik';
import FormikField from './FormikField';
import MenuItem from '@mui/material/MenuItem';
import { ISelectOptions } from '../../constants/selectsOptions';
import { TextField } from '@mui/material';

interface IFormikSelect {
    name: string
    required?: boolean
    options: ISelectOptions[]
    label: string
    values?: any
    onChangeFunc?: 
        (e: React.ChangeEvent<HTMLInputElement>, 
        field: FieldInputProps<any>, 
        values: any, 
        setValues: (value: any, shouldValidate?: boolean) => void) => void
    setValues?: (values: any, shouldValidate?: boolean) => void
}

const FormikSelect: React.FC<IFormikSelect> = ({ required, options, label, values, onChangeFunc, setValues,  ...props }) => {

    const [field, meta, helper] = useField(props)

    const caption = meta.touched && meta.error ? meta.error : null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('hello')
        onChangeFunc(e, field, values, setValues)
    }


    const selectDefaultProps = {
        value: field.value ?? '',
        label,
        fullWidth: true,
        select: true,
    } 

    const selectProps = !!onChangeFunc 
        ? { ...selectDefaultProps, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e) } 
        : { ...selectDefaultProps }

    const SelectComponent = () => {
        return (
            <TextField {...field} {...selectProps} >
                {options.map(item => <MenuItem key={item.id} value={item.id}>{item.translation ?? item.id}</MenuItem>)}
             </TextField>
        )
    }

    return (
        <FormikField caption={caption}>
            <Field
                name={props.name}
                component={SelectComponent}
            />
        </FormikField>
    )
}

export default FormikSelect;