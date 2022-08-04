export interface IUser {
    id: number
    email: string
    name: string
    surname: string
    patronymic: string
    role_id: string
}

export interface IFullUser {
    accessToken: string
    refreshToken: string
    user: IUser
}

export interface IUserRequest extends Omit<IUser, 'id'> {
    password: string
}