import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";
import {getUserProfile} from "./profile-reduser";

export  type AppStateInitialType = {
    initialized: boolean
}
type InitializedSuccessAppType = ReturnType<typeof initializedSuccessApp>

type AppReducerActionType = InitializedSuccessAppType


let initialState: AppStateInitialType = {
    initialized: false
}

export const appReducer = (state = initialState, action: AppReducerActionType): AppStateInitialType => {
    switch (action.type) {
        case "APP/SET-INITIALIZED": {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}
export const initializedSuccessApp = () => ({type: "APP/SET-INITIALIZED"}) as const


//Thunk creator for login user
type AppReducerThunkType = ThunkAction<void, AppStateType, unknown, AppReducerActionType>

export const initializeApp = (): AppReducerThunkType => async (dispatch
                                                               , getState: () => AppStateType) => {
    await dispatch(getAuthUserData())
    if(getState().auth.isAuth)await dispatch(getUserProfile(getState().auth.id!))

    dispatch(initializedSuccessApp())
}
