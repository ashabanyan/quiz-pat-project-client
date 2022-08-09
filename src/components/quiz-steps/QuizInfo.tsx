import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton, Input } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { saveFile } from '../../api/fileStorage';
import { getQuizCategories, getQuizLevels } from '../../api/nsi';
import { ISelectOptions, userRoles } from '../../constants/selectsOptions';
import { quizInfoSchema } from '../../constants/ValidationSchemas';
import { IQuizLevel, IQuizCategories, IQuizForm, IQuizCoverFile } from '../../types/quiz';
import { bem } from '../../utils/helpers';
import FormikFileUploader from '../formik-components/FormikFileUploader';
import FormikSelect from '../formik-components/FormikSelect';
import FormikTextInput from '../formik-components/FormikTextInput';

const b = bem('quiz-info')

const QuizInfoForm: React.FC = () => {
    const [levels, setLevels] = useState<IQuizLevel[]>(null)
    const [categories, setCategories] = useState<IQuizCategories[]>(null)
    const [fileInfo, setFileInfo] = useState<IQuizCoverFile>()

    const initialValues = {
        name: '',
        category: "",
        level: "",
        cover: {} as File
    }

    useEffect(() => {
        getLevels()
        getCategories()
    }, [])

    const getLevels = async () => {
        const data = await getQuizLevels()
        setLevels(data)
    }

    const getCategories = async () => {
        const data = await getQuizCategories()
        setCategories(data)
    }

    const formSubmit = async (values: IQuizForm) => {
        const data = await saveFile(values.cover)
        console.log(data)
    }

    return (
        <div className={b()}>
            {levels && categories
                ? <Formik
                initialValues={initialValues}
                // validationSchema={quizInfoSchema}
                onSubmit={formSubmit}
            >
                {({ values, setFieldValue}) => (
                    <Form>
                        <FormikTextInput
                            name='name'
                            placeholder="Введите название квиза"
                            label="Название"
                            type="text"
                            required
                        />
    
                        <FormikSelect name="level" label="Сложность квиза" required options={levels} />

                        <FormikSelect name="category" label="Категория квиза" required options={categories} />

                        <FormikFileUploader changeFunc={setFieldValue} name="cover" label="Загрузите файл" required />

                        <Button                
                            variant="contained"
                            type="submit"
                            size="small"
                        >
                            Сохранить
                        </Button>
                    </Form>
                )}
            </Formik>
            : <h1>Hello</h1>
            }
        </div>
    )
}

export default QuizInfoForm;