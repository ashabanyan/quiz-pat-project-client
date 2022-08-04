// Удобный console.log
export const logger = (value: any) => `${value.toString()} ---------- ${value}`

// Утилита для нейминга css классов
export const bem = (mainName: string, elPrefix: string = '__') => (element?: string) => element ? `${mainName}${elPrefix}${element}` : mainName
