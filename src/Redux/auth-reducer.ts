import {authAPI, securityAPI, SendLoginPropertyType} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {FormAction} from "redux-form";
import {setIsFetching} from "./users-reducer";
import {AxiosError} from "axios";
import {handleNetworkError, handleServerError} from "../utils/HandleNetworkError/handleNetworkError";

export  type AuthStateType = {
    id: number | null,
    email: string | null,
    login: string | null
    isAuth: boolean
    captcha: string | null
    avatar?: null | string
}
type SetUserDataType = ReturnType<typeof setUserData>
type SetCaptchaType = ReturnType<typeof setCaptcha>
export type SetMyAvatarType = ReturnType<typeof setMyAvatar>

type AuthReducerActionType = SetMyAvatarType | SetCaptchaType | SetUserDataType | FormAction


let initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null,
    avatar: null
}

export const authReducer = (state = initialState, action: AuthReducerActionType): AuthStateType => {
    switch (action.type) {
        case "AUTH/SET-AVATAR":
        case "AUTH/SET-USER-DATA":
        case 'AUTH/SET-CAPTCHA': {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean, captcha?: string | null) => ({
    type: 'AUTH/SET-USER-DATA',
    payload: {id, email, login, isAuth, captcha}
}) as const

export const setCaptcha = (captcha: string) => ({type: 'AUTH/SET-CAPTCHA', payload: {captcha}}) as const
export const setMyAvatar = (avatar: string | null) => ({type: 'AUTH/SET-AVATAR', payload: {avatar}}) as const


//Thunk creator for login user
type authUserThunkType = ThunkAction<any, AppStateType, unknown, AuthReducerActionType>

export const getAuthUserData = (): authUserThunkType => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        const response = await authAPI.getAuthMe()
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(setUserData(id, email, login, true))
        }
        dispatch(setIsFetching(false))
    }catch (e){
        const error = e as AxiosError
        handleNetworkError(dispatch,error)
    }

}
export const loginAuthUser = (loginValue: SendLoginPropertyType): authUserThunkType =>
    async (dispatch) => {
        dispatch(setIsFetching(true))
        try {
            const response = await authAPI.loginAuthMe(loginValue)
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else if (response.data.resultCode === 1) {
                handleServerError(dispatch,response.data.messages)
            } else if (response.data.resultCode === 10) {
                dispatch(getCaptchaURL())
                handleServerError(dispatch,response.data.messages)
            }

            dispatch(setIsFetching(false))
        } catch (e) {
            const error = e as AxiosError
            handleNetworkError(dispatch,error)
        }

    }

export const logOutAuthUser = (): authUserThunkType =>
    async (dispatch) => {
        dispatch(setIsFetching(true))

        try {
            const response = await authAPI.logOutAuthMe()

            if (response.data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
            }
            else{
                handleServerError(dispatch,response.data.messages)
            }

        } catch (e) {
            const error = e as AxiosError
            handleNetworkError(dispatch,error)
        }

    }
export const getCaptchaURL = (): authUserThunkType =>
    async (dispatch) => {
        dispatch(setIsFetching(true))
        try {
            const response = await securityAPI.getCaptchaUrl()
            dispatch(setCaptcha(response.data.url))
            dispatch(setIsFetching(false))
        } catch (e) {
            const error = e as AxiosError
            handleNetworkError(dispatch,error)
        }
    }

