export interface ISelectOptions {
    id: number
    name: string
    translation: string
}

export const userRoles: ISelectOptions[]  = [
    {
        id: 1,
        name: 'user',
        translation: 'Пользователь'
    },
    {
        id: 2,
        name: 'advanced',
        translation: 'Продвинутый'
    },
    {
        id: 3,
        name: 'master',
        translation: 'Мастер'
    }
]