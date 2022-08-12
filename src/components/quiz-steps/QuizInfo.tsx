import { Button, Grid } from '@mui/material';
import { Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { saveFile } from '../../api/fileStorage';
import { getQuizCategories, getQuizLevels } from '../../api/nsi';
import { createQuizInfo } from '../../api/quiz';
import { quizInfoSchema, quizRoundSchema } from '../../constants/ValidationSchemas';
import { IQuizLevel, IQuizCategories, IQuizInfoForm, IQuizCoverFile, IQuizInfoReq } from '../../types/quiz';
import { bem } from '../../utils/helpers';
import FormikFileUploader from '../formik-components/FormikFileUploader';
import FormikSelect from '../formik-components/FormikSelect';
import FormikTextInput from '../formik-components/FormikTextInput';
import QuizStepsButtonBlock from './QuizStepsButtonBlock';
import { QuizSteps } from '../../types/enums/quiz'

const b = bem('quiz-info')

interface IQuizInfoFormComponent {
    activeStep: number
    handleNext: () => void
    handleBack: () => void
    stepsLength: number
    presaveData: (values: IQuizInfoForm, step: QuizSteps) => void
    currentData: IQuizInfoForm | null
}

const QuizInfoForm: React.FC<IQuizInfoFormComponent> = ({ activeStep, handleNext, handleBack, stepsLength, presaveData, currentData }) => {
    const [levels, setLevels] = useState<IQuizLevel[]>(null)
    const [categories, setCategories] = useState<IQuizCategories[]>(null)

    const initialValues = currentData ?? {
        name: '',
        category_id: '',
        level_id: '',
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

    const formSubmit = (values: IQuizInfoForm) => presaveData(values, QuizSteps.INFO)

    // --------

    // const testFunc = async () => {
    //     const data = await quizRoundSchema.isValid(obj)
    //     console.log(data)
    // }

    // testFunc()


    // --------

    // const saveQuizInfo = async (values: IQuizInfoForm, fileData: IQuizCoverFile) => {
    //     const { cover, ...rest } = values
    //     const quizObj: IQuizInfoReq = {
    //         ...rest,
    //         cover_id: fileData.id
    //     }
    //     const data = await createQuizInfo(quizObj)

    // }



    // const formSubmit = async (values: IQuizInfoForm) => {
    //     const fileData = await saveFile(values.cover)
    //     const quizInfo = await saveQuizInfo(values, fileData)
    // }

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
                                    required 
                                />
                            </Grid>
                        </Grid>

                        <QuizStepsButtonBlock 
                            activeStep={activeStep} 
                            handleBack={handleBack} 
                            handleNext={handleNext} 
                            stepsLength={stepsLength}
                        />
                    </Form>
                )}
            </Formik>
            : <h1>Hello</h1>
            }
        </div>
    )
}

export default QuizInfoForm;