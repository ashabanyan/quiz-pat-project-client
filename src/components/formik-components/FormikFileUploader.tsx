import { useField } from 'formik';
import React, { ChangeEventHandler, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import FormikField from './FormikField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import { ISelectOptions } from '../../constants/selectsOptions';
import { bem, getHumanFileSize } from '../../utils/helpers';
import { PhotoCamera } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';

interface IFormikFileUploader {
    name: string
    required?: boolean
    label: string
    changeFunc: (field: string, value: any, shouldValidate?: boolean) => void
    text: string
}

const b = bem('formik-file-uploader');

const FormikFileUploader: React.FC<IFormikFileUploader> = ({ required, label, changeFunc, text, ...props }) => {
    const [fileData, setFileData] = useState<File>(null as File)

    const [field, meta, helper] = useField(props)

    const caption = meta.touched && meta.error ? meta.error : null

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileData(e.currentTarget.files[0])
        changeFunc('cover', e.currentTarget.files[0])
    }

    // const textInfo = fileData ? fileData.name : text

    const textInfo = useMemo(() => {
        if (!fileData) return text;
        const sizeValue = getHumanFileSize(fileData.size)
        return `${fileData.name} (${sizeValue})`
    }, [fileData])

    const humanFileSize = useMemo(() => {
        if (fileData) {
            const kbValue = fileData.size / 1024
            const mbValue = kbValue / 1024
            return mbValue < 1 ? `${Math.round(kbValue)} КБ` : `${Math.round(mbValue)} МБ`
        }
    }, [fileData])


    return (
        <FormikField caption={caption}>
            <input
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={onChange}
            />
            <label htmlFor="contained-button-file" className={b('label')}>
                <div className={b('block')}>
                    <Typography variant="overline" display="block" gutterBottom>
                        {textInfo} 
                    </Typography>
                </div>

            </label>
            {/* </FormControl> */}
        </FormikField>
    )
}

export default FormikFileUploader;