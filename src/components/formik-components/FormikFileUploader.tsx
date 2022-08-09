import { useField } from 'formik';
import React, { ChangeEventHandler, SyntheticEvent, useEffect, useState } from 'react';
import FormikField from './FormikField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import { ISelectOptions } from '../../constants/selectsOptions';
import { bem } from '../../utils/helpers';
import { PhotoCamera } from '@mui/icons-material';

interface IFormikFileUploader {
    name: string
    required?: boolean
    label: string
    changeFunc: (field: string, value: any, shouldValidate?: boolean) => void
}

const b = bem('formik-file-uploader');

const FormikFileUploader: React.FC<IFormikFileUploader> = ({ required, label, changeFunc, ...props }) => {
    const [fileData, setFileData] = useState<File>({} as File)

    const [field, meta, helper] = useField(props)

    const caption = meta.touched && meta.error ? meta.error : null

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileData(e.currentTarget.files[0])
        changeFunc('cover', e.currentTarget.files[0])
    }

    return (
        <FormikField label={label} caption={caption} required={required}>
            <label htmlFor="file-upload">
                <PhotoCamera />
            </label>
            
            <Input 
                {...props} 
                onChange={onChange} 
                type="file" 
                id="file-upload" 
                className={b('input')}
                fullWidth
            />
                
        </FormikField>
    )
}

export default FormikFileUploader;