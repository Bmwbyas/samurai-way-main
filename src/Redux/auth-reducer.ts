import {authAPI, SendLoginPropertyType} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";

export  type AuthStateType = {
    id: number | null,
    email: string | null,
    login: string | null
    isAuth: boolean
}
type SetUserDataType = ReturnType<typeof setUserData>

type AuthReducerActionType = SetUserDataType | FormAction


let initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state = initialState, action: AuthReducerActionType): AuthStateType => {
    switch (action.type) {
        case "SET-USER-DATA": {
            return {
                ...state,
                ...action.payload,

            }
        }

        default:
            return state;
    }
}
const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET-USER-DATA',
    payload: {id, email, login, isAuth}
}) as const


//Thunk creator for login user
type authUserThunkType = ThunkAction<any, AppStateType, unknown, AuthReducerActionType>

export const getAuthUserData = (): authUserThunkType => (dispatch) => {
    return authAPI.getAuthMe()
        .then(response => {
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(setUserData(id, email, login, true))
        }
    });
}
export const loginAuthUser = (loginValue: SendLoginPropertyType): authUserThunkType => {
    return (dispatch) => {
        authAPI.loginAuthMe(loginValue)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData())
                } else {
                    let message = response.data.messages.length ? response.data.messages[0] : 'some error'
                    dispatch(stopSubmit('login', {_error: message}))
                }
            });
    }
}
export const logOutAuthUser = (): authUserThunkType => {
    return (dispatch) => {
        authAPI.logOutAuthMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false))
                }
            });
    }
}
