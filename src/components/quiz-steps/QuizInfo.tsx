import { Box, Button, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { getQuizCategories, getQuizLevels } from '../../api/nsi';
import { quizInfoSchema } from '../../constants/ValidationSchemas';
import { IQuizLevel, IQuizCategories, IQuizInfoValues } from '../../types/quiz';
import { bem } from '../../utils/helpers';
import FormikFileUploader from '../formik-components/FormikFileUploader';
import FormikSelect from '../formik-components/FormikSelect';
import FormikTextInput from '../formik-components/FormikTextInput';

const b = bem('quiz-info')

interface IQuizInfoFormComponent {
    presaveData: (values: IQuizInfoValues) => void
    currentData: IQuizInfoValues | null
}

const QuizInfoForm: React.FC<IQuizInfoFormComponent> = ({ presaveData, currentData }) => {
    const [levels, setLevels] = useState<IQuizLevel[]>(null)
    const [categories, setCategories] = useState<IQuizCategories[]>(null)

    const initialValues = currentData ?? {
        name: '',
        category_id: '',
        level_id: '',
        cover: null as File
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

    const formSubmit = (values: IQuizInfoValues) => presaveData(values)

    return (
        <div className={b()}>
            {levels && categories
                ? <Formik
                initialValues={initialValues}
                validationSchema={quizInfoSchema}
                onSubmit={formSubmit}
            >
                {({ values, setFieldValue}) => (
                    <Form>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={6}>
                                <FormikTextInput
                                    name='name'
                                    placeholder="Введите название квиза"
                                    label="Название"
                                    type="text"
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormikSelect 
                                    name="level_id" 
                                    label="Сложность квиза" 
                                    required 
                                    options={levels} 
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <FormikSelect 
                                    name="category_id" 
                                    label="Категория квиза" 
                                    required 
                                    options={categories} 
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormikFileUploader 
                                    changeFunc={setFieldValue} 
                                    name="cover" 
                                    label="Загрузите файл" 
                                    text="Загрузить обложка квиза"
                                    required 
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 2 }}>
                            <Button type="submit">
                                Сохранить черновик шага
                            </Button>
                        </Box>
                    </Form>
                    
                )}
            </Formik>
            : <h1>Hello</h1>
            }
        </div>
    )
}

export default QuizInfoForm;