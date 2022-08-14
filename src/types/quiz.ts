// ---------------- Quiz NSI ----------------

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

// ---------------- Quiz Info ----------------

export interface IQuizInfoValues {
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

export interface IQuizInfoWithCoverId extends Omit<IQuizInfoValues, 'cover'> {
    cover_id: number
    
}

export interface IQuizInfoRequest extends IQuizInfoWithCoverId {
    roundCount: number
}

// ---------------- Quiz Rounds ----------------
export interface IQuizRound {
    id: number,
    name: string,
}

export interface IQuizRoundsValues {
    roundCount: number,
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

// ---------------- QuizQuestions ----------------
// export interface IQuizCommon {
//     quizInfoReq: IQuizInfoRequest,
//     quizRound: IQuizRoundsValues,
//     quizQuestions: IQuizQuestionsValues
// }

// ---------------- Full Quiz for request ----------------

export interface IQuizRounds {
    roundId: number
    questionsCount: number,
    questions: IQuizQuestionItem[]
}

export interface IQuizRequest {
    quizInfo: IQuizInfoRequest
    quizRound: IQuizRounds[]
}