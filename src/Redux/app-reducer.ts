import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";
import {getUserProfile} from "./profile-reduser";
import {setIsFetching, SetIsFetchingType} from "./users-reducer";
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/HandleNetworkError/handleNetworkError";

export  type AppStateInitialType = {
    initialized: boolean
    error: null | string,
}
export type SetErrorType = ReturnType<typeof setError>
type InitializedSuccessAppType = ReturnType<typeof initializedSuccessApp> | SetErrorType | SetIsFetchingType

type AppReducerActionType = InitializedSuccessAppType


let initialState: AppStateInitialType = {
    initialized: false,
    error: null

}

export const appReducer = (state = initialState, action: AppReducerActionType): AppStateInitialType => {
    switch (action.type) {
        case "APP/SET-INITIALIZED":
            return {
                ...state,
                initialized: true
            }
        case "APP/SET-ERROR":
            return {...state, ...action.error}
        default:
            return state;
    }
}
export const initializedSuccessApp = () => ({type: "APP/SET-INITIALIZED"}) as const
export const setError = (error: { error: string | null }) => ({type: "APP/SET-ERROR", error}) as const


//Thunk creator for login user
type AppReducerThunkType = ThunkAction<void, AppStateType, unknown, AppReducerActionType>

export const initializeApp = (): AppReducerThunkType => async (dispatch
    , getState: () => AppStateType) => {
    dispatch(setIsFetching(true))
    try {
       await dispatch(getAuthUserData())

            if (getState().auth.isAuth) await dispatch(getUserProfile(getState().auth.id!))

        dispatch(initializedSuccessApp())
        dispatch(setIsFetching(false))

    } catch (e) {
        const error = e as AxiosError
        handleNetworkError(dispatch, error)
    }

}
