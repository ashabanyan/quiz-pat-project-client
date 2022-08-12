import { ISelectOptions } from "../constants/selectsOptions"

// Удобный console.log
export const logger = (value: any) => `${value.toString()} ---------- ${value}`

// Утилита для нейминга css классов
export const bem = (mainName: string, elPrefix: string = '__') => (element?: string) => element ? `${mainName}${elPrefix}${element}` : mainName

// Утилита для создания массива options количества раундов
// export const getRoundCountArray = (count: number): ISelectOptions[] => {
//     const test = Array.from(Array(10).keys()).map(item => ({
//         id: item,
//         name: `${item}`,
//         translation: `${item}`
//     }))
//     return test
// }

export const getRoundCountArray = (count: number): ISelectOptions[] => Array.from(Array(10).keys()).map(item => ({
    id: item + 1,
    name: `${item + 1}`,
    translation: `${item + 1}`
}))