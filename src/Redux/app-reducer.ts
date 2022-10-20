import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";

export  type AppStateInitialType = {
    initialized:boolean
}
type InitializedSuccessAppType = ReturnType<typeof initializedSuccessApp>

type AppReducerActionType = InitializedSuccessAppType


let initialState: AppStateInitialType = {
    initialized:false
}

export const appReducer = (state = initialState, action: AppReducerActionType): AppStateInitialType => {
    switch (action.type) {
        case "APP/SET-INITIALIZED": {
            return {
                ...state,
                initialized:true
            }
        }
        default:
            return state;
    }
}
const initializedSuccessApp = () => ({type: "APP/SET-INITIALIZED"}) as const


//Thunk creator for login user
type AppReducerThunkType = ThunkAction<void, AppStateType, unknown, AppReducerActionType>

export const initializeApp = (): AppReducerThunkType => (dispatch) => {
   let promise=dispatch(getAuthUserData())
    promise.then(()=>{dispatch(initializedSuccessApp())})

}
