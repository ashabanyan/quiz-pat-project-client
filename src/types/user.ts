export interface IUser {
    id: number
    email: string
    name: string
    surname: string
    patronymic: string
    role_id: number
}

export interface IFullUser {
    accessToken: string
    refreshToken: string
    user: IUser
}