import {AxiosError} from "axios";
import {setError, SetErrorType} from "../../Redux/app-reducer";
import {setIsFetching, SetIsFetchingType} from "../../Redux/users-reducer";
import {ThunkDispatch} from "redux-thunk";

export const handleNetworkError=(dispatch:ThunkDispatch<void, unknown, SetErrorType|SetIsFetchingType>,error:AxiosError)=>{
    dispatch(setError({error: error.message ? error.message : "some error occurred"}))
    dispatch(setIsFetching(false))
}
export const handleServerError=(dispatch:ThunkDispatch<void, unknown, SetErrorType|SetIsFetchingType>
                                ,messages:string[])=>{
    let message = messages.length ? messages[0] : 'some error'
    dispatch(setError({error: message}))
    dispatch(setIsFetching(false))
}