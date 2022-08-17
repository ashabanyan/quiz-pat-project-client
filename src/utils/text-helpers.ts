import { loginPageButtonTooltip } from "../constants/loginPageButtons"

export const getLoginButtonTooltipText = (email: string, password: string): string => {
    return email && password 
        ? loginPageButtonTooltip.ready 
        : !email && password 
            ? loginPageButtonTooltip.noEmail
            : email && !password 
             ? loginPageButtonTooltip.noPassword
             : !email && !password
                ? loginPageButtonTooltip.empty
                : ''
}

export const getUserNameFirstLetters = (name: string, surname: string): string => 
    name && surname 
        ? `${name[0].toUpperCase()}${surname[0].toUpperCase()}` 
        : ''