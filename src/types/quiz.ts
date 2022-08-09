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

export interface IQuizForm {
    name: string
    level: string
    category: string
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