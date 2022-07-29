// Утилита для нейминга css классов
export const bem = (mainName: string, elPrefix: string = '__') => (element?: string) => `${mainName}${elPrefix}${element}`
