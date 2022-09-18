import {authAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

export  type AuthStateType={
    id: number|null,
    email: string|null,
    login: string|null
    isAuth:boolean
}
type SetUserDataType=ReturnType<typeof setUserData>

type AuthReducerActionType = SetUserDataType


let initialState:AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth:false
}

export const authReducer = (state = initialState, action: AuthReducerActionType): AuthStateType => {
    switch (action.type) {
        case "SET-USER-DATA":{
            return {
                ...state,
                ...action.data,
                isAuth:true
            }
        }
        default:
            return state;
    }
}
const setUserData=(id:number,email:string,login:string)=>({type:'SET-USER-DATA',data:{id,email,login}})as const

//Thunk creator for login user
type authUserThunkType=ThunkAction<any, AppStateType, unknown, AuthReducerActionType>

export const getAuthUserData=():authUserThunkType=>(dispatch)=>{
    return  authAPI.getAuthMe().then(response => {
        if(response.resultCode===0){
            let {id,email,login}=response.data
            dispatch(setUserData(id,email,login))
        }

    });
}
