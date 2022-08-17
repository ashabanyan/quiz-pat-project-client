import { CircularProgress, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { quizInfoCoverParams } from '../../constants/files';
import { quizInfoSchema } from '../../constants/ValidationSchemas';
import { IQuizLevel, IQuizCategories, IQuizInfoValues } from '../../types/quiz';
import { bem } from '../../utils/helpers';
import FormikFileUploader from '../formik-components/FormikFileUploader';
import FormikSelect from '../formik-components/FormikSelect';
import FormikTextInput from '../formik-components/FormikTextInput';
import QuizStepButtonSubmit from './QuizStepButtonSubmit';

const b = bem('quiz-info')

interface IQuizInfoFormComponent {
    presaveData: (values: IQuizInfoValues) => void
    currentData: IQuizInfoValues | null
    levels: IQuizLevel[] | null
    categories: IQuizCategories[] | null
}

const QuizInfoForm: React.FC<IQuizInfoFormComponent> = ({ presaveData, currentData, levels, categories }) => {
    const [isDataPresaved, setIsDataPresaved] = useState<boolean>(!!currentData)
    const initialValues = currentData ?? {
        name: '',
        category_id: '',
        level_id: '',
        cover: null as File
    }

    const formSubmit = (values: IQuizInfoValues) => {
        presaveData(values)
        setIsDataPresaved(true)
    }

    const fileUploadTooltipText = `Макс. размер ${quizInfoCoverParams.size.mb} МБ. ${quizInfoCoverParams.width}/${quizInfoCoverParams.height}`

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
                                    text="Загрузить обложку квиза"
                                    required 
                                    tooltipText={fileUploadTooltipText}
                                />
                            </Grid>
                        </Grid>
                        <QuizStepButtonSubmit presaved={isDataPresaved} />
                    </Form>
                    
                )}
            </Formik>
            : <CircularProgress color="inherit" />
            }
        </div>
    )
}

export default QuizInfoForm;