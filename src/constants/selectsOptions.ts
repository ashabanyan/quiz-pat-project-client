export interface ISelectOptions {
    name: string;
    translation: string;
}

export const userRoles: ISelectOptions[]  = [
    {
        name: 'user',
        translation: 'Пользователь'
    },
    {
        name: 'advanced',
        translation: 'Продвинутый'
    },
    {
        name: 'master',
        translation: 'Мастер'
    }
]