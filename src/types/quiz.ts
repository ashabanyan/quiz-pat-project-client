export interface IQuizLevel {
    id: number
    name: string
    translation: string
}

export interface IQuizCategories {
    id: number
    name: string
    translation: string
}

export interface IQuizInfoForm {
    name: string
    level_id: string
    category_id: string
    cover: File
}

export interface IQuizCoverFile {
    id: number
    filename: string
    originalname: string
    extension: string
    destination: string
    size: number
}

export interface IQuizInfoReq extends Omit<IQuizInfoForm, 'cover'> {
    cover_id: number
}

export interface IQuizRound {
    id: number,
    name: string,
}

export interface IQuizRoundsValues {
    roundCount: string,
    rounds: IQuizRound[]
}

// ---------------- QuizQuestions ----------------

export interface IQuizQuestionItem {
    id: number
    question: string
    answer: string
}

export interface IQuizQuestions {
    roundId: number,
    questionsCount: number,
    questions: IQuizQuestionItem[]
}
export interface IQuizQuestionsValues {
    roundsQuestions: IQuizQuestions[]
}

