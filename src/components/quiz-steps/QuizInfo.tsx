import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton, Input } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { getQuizCategories, getQuizLevels } from '../../api/nsi';
import { ISelectOptions, userRoles } from '../../constants/selectsOptions';
import { IQuizLevel, IQuizCategories } from '../../types/quiz';
import FormikSelect from '../formik-components/FormikSelect';
import FormikTextInput from '../formik-components/FormikTextInput';

const QuizInfoForm: React.FC = () => {
    const [levels, setLevels] = useState<IQuizLevel[]>(null)
    const [categories, setCategories] = useState<IQuizCategories[]>(null)

    const initialValues = {
        name: '',
        category: '',
        level: '',
        cover: ''
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

    useEffect(() => console.log('categories ----- ', levels), [levels])
    console.log(userRoles)

    return (
        <>
            {levels && categories
                ? <Formik
                initialValues={initialValues}
                onSubmit={(values) => console.log(values)}
            >
                {(values) => (
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

                        <label htmlFor="contained-button-file">
                            <Input id="contained-button-file"  type="file" />
                            <Button variant="contained" component="span">
                            Upload
                            </Button>
                        </label>

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
        </>
    )
}

export default QuizInfoForm;