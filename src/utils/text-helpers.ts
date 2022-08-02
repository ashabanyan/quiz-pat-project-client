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