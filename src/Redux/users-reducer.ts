import {GetUsersParamsType, usersAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {getRandomInt} from "../components/common/IntegerRandom/IntegerRandom";

export type UsersDataType = {
    id: number
    name: string
    followed: boolean
    status: string | null
    uniqueUrlName: string | null
    photos: {
        small: string | null
        ladge: string | null
    }
}
type FollowUserActionType = {
    type: 'USER/CHANGE-FOLLOW',
    userID: number,
}
type SetUsers = {
    type: 'USER/SET-USERS',
    users: UsersDataType[]
}
type SetCurrentPageType = {
    type: 'USER/SET-CURRENT-PAGE'
    currentPage: number
}

type SetTotalcountType = ReturnType<typeof setTotalCount>
export type SetIsFetchingType = ReturnType<typeof setIsFetching>
type FollowingInProgressType = ReturnType<typeof setFollowingInProgress>
type UsersReducerActionType = FollowUserActionType
    | SetUsers
    | SetCurrentPageType
    | SetTotalcountType
    | SetIsFetchingType
    | FollowingInProgressType
    | ReturnType<typeof addFriend>
    | ReturnType<typeof deleteFriend>
    | ReturnType<typeof setFriend>
    | ReturnType<typeof clearDataFriends>
    | ReturnType<typeof setUserUnknown>
|ReturnType<typeof toggleIsLoading>
|ReturnType<typeof clearUsers>
|ReturnType<typeof updateUsersParams>



export type UsersPageStateType = typeof initialState
let initialState = {
    getUsersParams: {
        page:1,
        count:8,
        term:null,
        friend:null
    } as GetUsersParamsType,
    usersData: [] as UsersDataType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[],
    friends: []  as UsersDataType[],
    usersUnknown: [] as UsersDataType[],
    isLoading:false

}

export const usersReducer = (state = initialState, action: UsersReducerActionType): UsersPageStateType => {
    switch (action.type) {
        case 'USER/CHANGE-FOLLOW':
            return {
                ...state,
                usersData: state.usersData.map(user => user.id === action.userID ? {
                    ...user,
                    followed: !user.followed
                } : user)
            }


        case 'USER/SET-USERS':
            return {...state, usersData:action.users}

        case 'USER/SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}

        case 'USER/SET-TOTAL-COUNT':
            return {...state, totalUsersCount: action.totalCount}

        case "USER/SET-FETCHING":
            return {...state, isFetching: action.isFetching}

        case "USER/SET-FOLLOWING-IN-PROGRESS" :
            return {
                ...state,
                followingInProgress: action.followingInProgressBoolean
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case "USER/ADD-FRIEND":
            return {...state, friends: [...state.friends, action.user]}
        case "USER/DELETE-FRIEND":
            return {
                ...state,
                friends: state.friends.filter(f => f.id !== action.id)
            }
        case "USER/SET-FRIEND":
            return {...state, friends: action.users}

        case "USER/CLEAR-DATA-FRIENDS":
            return {...state, friends: []}
        case "USER/USER-UNKNOWN":
            return {...state, usersUnknown: action.users}
        case "USER/TOGGLE-LOADING":
        return {...state,isLoading:action.isLoading}
        case "USER/CLEAR-USERS":
        return {...state,usersData: []}
        case "USER/UPDATE-USERS-PARAMS":
            return {...state,getUsersParams: {...state.getUsersParams,...action.payload}}
        default:
            return state;
    }
}

//actions

export const changeFollow = (userID: number): FollowUserActionType => ({type: 'USER/CHANGE-FOLLOW', userID})
export const setUsers = (users: UsersDataType[]): SetUsers => ({type: 'USER/SET-USERS', users})
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
    type: 'USER/SET-CURRENT-PAGE',
    currentPage
})
export const setTotalCount = (totalCount: number) => ({type: 'USER/SET-TOTAL-COUNT', totalCount}) as const
export const setIsFetching = (isFetching: boolean) => ({type: 'USER/SET-FETCHING', isFetching}) as const

export const setFollowingInProgress = (followingInProgressBoolean: boolean, userId: number) => ({
    type: 'USER/SET-FOLLOWING-IN-PROGRESS',
    followingInProgressBoolean, userId
}) as const
export const addFriend = (user: UsersDataType) => ({type: 'USER/ADD-FRIEND', user}) as const
export const setFriend = (users: UsersDataType[]) => ({type: 'USER/SET-FRIEND', users}) as const
export const deleteFriend = (id: number) => ({type: 'USER/DELETE-FRIEND', id}) as const
export const clearDataFriends = () => ({type: 'USER/CLEAR-DATA-FRIENDS'}) as const
export const setUserUnknown = (users: UsersDataType[]) => ({type: 'USER/USER-UNKNOWN', users}) as const
export const toggleIsLoading = (isLoading: boolean) => ({type: 'USER/TOGGLE-LOADING', isLoading}) as const
export const clearUsers = () => ({type: 'USER/CLEAR-USERS'}) as const
export const updateUsersParams = (params:GetUsersParamsType) => ({type: 'USER/UPDATE-USERS-PARAMS',payload:params}) as const



type ThunkCreatorType = ThunkAction<void, AppStateType, unknown, UsersReducerActionType>

//thunks




export const getUsers = (paramsGetUsers:GetUsersParamsType): ThunkCreatorType => async (dispatch, getState:()=>AppStateType) => {

    dispatch(setIsFetching(true))
    if(paramsGetUsers.term!==null)dispatch(toggleIsLoading(true))
    let getParamsStore=getState().usersPage.getUsersParams
    let params:GetUsersParamsType={
        ...getParamsStore,...paramsGetUsers
    }
    dispatch(updateUsersParams(params))
    const data = await usersAPI.getUsers(params)

        dispatch(setUsers(data.items))
        dispatch(setTotalCount(data.totalCount))
    dispatch(setIsFetching(false))
    if(paramsGetUsers.term!==null)dispatch(toggleIsLoading(false))
}

export const getUnknown = (): ThunkCreatorType => async (dispatch) => {
    const currentPage = getRandomInt(1, 30)
    const pageSize = 8
    const response = await usersAPI.getUsers({page: currentPage, count: pageSize, friend: false})
    dispatch(setUserUnknown(response.items))

}

export const getFriend = (isFriends?: boolean): ThunkCreatorType => async (dispatch) => {

    const response = await usersAPI.getUsers({page: 1, count: 100, friend: isFriends})
    dispatch(setFriend(response.items))

}


export const changeFollowUnfollow = (user: UsersDataType): ThunkCreatorType => async (dispatch) => {
    dispatch(setFollowingInProgress(true, user.id))

    try {
        if (user.followed) {
            const data = await usersAPI.deleteFollowUser(user.id)
            if (data.resultCode === 0) {
                dispatch(deleteFriend(user.id))
                dispatch(changeFollow(user.id))
                dispatch(getFriend(true))
            }
        } else {
            const data = await usersAPI.addFollowUser(user.id)
            if (data.resultCode === 0) {
                dispatch(changeFollow(user.id))
                dispatch(addFriend(user))
                dispatch(getFriend(true))
            }

        }
        dispatch(setFollowingInProgress(false, user.id))

    }catch (e:any){

    }

}