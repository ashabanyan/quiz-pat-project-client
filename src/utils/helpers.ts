import { quizInfoCoverHeight, quizInfoCoverMaxSize, quizInfoCoverWidth } from "../constants/files"
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

export const getHumanFileSize = (size: number) => {
    const kbValue = size / 1024
    const mbValue = kbValue / 1024
    return mbValue < 1 ? `${kbValue.toFixed(2)} КБ` : `${mbValue.toFixed(2)} МБ`
}

export const validateFile = async (file: File): Promise<{ error: boolean, message: string }> => {
    
    let reader = new FileReader();
    reader.readAsDataURL(file);
    
    return new Promise((resolve, reject) => {
        if (file.size / 1024 > quizInfoCoverMaxSize.kb ) {
            resolve({ error: true, message: 'Размер файла не должен превышать 2 МБ'})
        }
        reader.onload = (ev: ProgressEvent<FileReader>) => {
            let img = new Image()
            img.src = ev.target.result as string
            img.onload = () => {
                if (img.width !== quizInfoCoverWidth && img.height !== quizInfoCoverHeight) {
                    resolve({ error: true, message: 'Ширина и высота картинки не соответствуют требованиям (300px/150px)' })
                } else {
                    resolve({ error: false, message: '' })
                }
                
            }
        }
    })
}