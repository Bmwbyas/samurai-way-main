
export  type AuthStateType={
    id: number|null,
    email: string|null,
    login: string|null
    isAuth:boolean
}
type SetUserDataType=ReturnType<typeof setUserData>

type UsersReducerActionType = SetUserDataType


let initialState:AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth:false
}

export const authReducer = (state = initialState, action: UsersReducerActionType): AuthStateType => {
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
export const setUserData=(id:number,email:string,login:string)=>({type:'SET-USER-DATA',data:{id,email,login}})as const
