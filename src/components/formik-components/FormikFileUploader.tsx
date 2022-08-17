import { useField } from 'formik';
import React, { useMemo, useState } from 'react';
import FormikField from './FormikField';
import { bem, getHumanFileSize, validateFile } from '../../utils/helpers';
import {  Typography } from '@mui/material';
import TooltipComponent from '../sub-components/TooltipComponent';
import InfoIcon from '@mui/icons-material/Info';

interface IFormikFileUploader {
    name: string
    required?: boolean
    label: string
    changeFunc: (field: string, value: any, shouldValidate?: boolean) => void
    text: string
    tooltipText?: string
}

const b = bem('formik-file-uploader');

const FormikFileUploader: React.FC<IFormikFileUploader> = ({ required, label, changeFunc, text, tooltipText, ...props }) => {
    const [fileData, setFileData] = useState<File>(null as File)
    const [fileSizeAttr, setFileSizeAttr] = useState<string | null>(null)

    const [field, meta, helper] = useField(props)
    console.log(meta)
    const caption = meta.touched && meta.error
    console.log(typeof caption)

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.currentTarget.files[0]

        const fileValidation = await validateFile(image)
        if (fileValidation.error) {
            setFileSizeAttr(fileValidation.message)
        } else {
            setFileData(image)
            changeFunc('cover', image)
        }
    }

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
        <FormikField caption={fileSizeAttr ?? caption}>
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
                    <Typography variant="overline" display="block" className={b('text')} gutterBottom>
                        {textInfo}
                    </Typography>
                    {tooltipText && <TooltipComponent title={tooltipText}>
                           <InfoIcon fontSize="small" color="primary" />
                        </TooltipComponent>}
                </div>

            </label>
            {/* </FormControl> */}
        </FormikField>
    )
}

export default FormikFileUploader;
