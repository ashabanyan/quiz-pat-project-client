import { IFullUser, IUser, IUserRequest } from "../types/user";
import { makeAutoObservable } from "mobx"
import { loginUser, refreshToken, registration } from "../api/auth";
import ApiService from '../api/apiService'
import { logger } from "../utils/helpers";

export class AuthStore {
    isAuth = false
    user = {} as IUser
    accessToken: string = ''
    refreshToken: string = ''
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    setAccessToken(accessToken: string) {
        this.accessToken = accessToken
    }

    setRefreshToken(refreshToken: string) {
        this.refreshToken = refreshToken
    }
    
    setIsLoading(bool: boolean) {
        this.isLoading = bool
    }

    setTokens(tokens: { accessToken: string; refreshToken: string }) {
        this.setAccessToken(tokens.accessToken)
        this.setRefreshToken(tokens.refreshToken)
    }

    setFullUser(data: IFullUser) {
        this.user = data.user
        this.accessToken = data.accessToken
        this.refreshToken = data.refreshToken
        this.isAuth = true
    }

    setEmptyUser() {
        this.user = {} as IUser
        this.accessToken = ''
        this.refreshToken = ''
        this.isAuth = false
    }

    async checkToken() {
        this.setIsLoading(true)
        try {
            const response = await refreshToken()
            localStorage.setItem('accessToken', response.accessToken)
            this.setFullUser(response)
        } catch (error) {
            console.error(error)
            this.setAuth(false)
        } finally {
            this.setIsLoading(false)
        }
    }

    async login(login: string, password: string) {
        this.setIsLoading(true)
        try {
            const loginData = await loginUser(login, password)
            localStorage.setItem('accessToken', loginData.accessToken)
            this.setFullUser(loginData)
        } catch (error) {
            return error
        } finally {
            this.setIsLoading(false)
        }
    }

    async logout() {
        try {
            const { data } = await ApiService.post('/logout')
            localStorage.removeItem('accessToken')
            this.setEmptyUser()
        } catch (error) {
            console.error(error.message)
        }
    }

    async registration(values: IUserRequest) {
        this.setIsLoading(true)
        try {
            const registrationData = await registration(values)
            localStorage.setItem('accessToken', registrationData.accessToken)
            this.setFullUser(registrationData)
        } catch (error) {
            return error
        } finally {
            this.setIsLoading(false)
        }
    }
}

export default new AuthStore()