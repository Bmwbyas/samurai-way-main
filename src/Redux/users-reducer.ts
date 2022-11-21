import {usersAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

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
type ShowMoreUsers = {
    type: 'USER/SHOW-MORE-USERS',
    users: UsersDataType[]
}
type SetCurrentPageType = {
    type: 'USER/SET-CURRENT-PAGE'
    currentPage: number
}
type SetTotalcountType = ReturnType<typeof setTotalCount>
type SetIsFetchingType = ReturnType<typeof setIsFetching>
type FollowingInProgressType = ReturnType<typeof setFollowingInProgress>
type UsersReducerActionType = FollowUserActionType
    | ShowMoreUsers
    | SetCurrentPageType
    | SetTotalcountType
    | SetIsFetchingType
    | FollowingInProgressType


export type UsersPageStateType = typeof initialState
let initialState = {
    usersData: [] as UsersDataType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[]
}

export const usersReducer = (state = initialState, action: UsersReducerActionType): UsersPageStateType => {
    switch (action.type) {
        case 'USER/CHANGE-FOLLOW': {
            return {
                ...state,
                usersData: state.usersData.map(user => user.id === action.userID ? {
                    ...user,
                    followed: !user.followed
                } : user)
            }
        }

        case 'USER/SHOW-MORE-USERS': {
            return {...state, usersData: [...action.users]}
        }
        case 'USER/SET-CURRENT-PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'USER/SET-TOTAL-COUNT': {
            return {...state, totalUsersCount: action.totalCount}
        }
        case "USER/SET-FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "USER/SET-FOLLOWING-IN-PROGRESS" : {
            return {
                ...state,
                followingInProgress: action.followingInProgressBoolean
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        default:
            return state;
    }
}

export const changeFollow = (userID: number): FollowUserActionType => ({type: 'USER/CHANGE-FOLLOW', userID: userID})
export const setUsers = (users: UsersDataType[]): ShowMoreUsers => ({type: 'USER/SHOW-MORE-USERS', users: users})
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


type ThunkCreatorType = ThunkAction<void, AppStateType, unknown, UsersReducerActionType>
// type DispatchThunkAC=Dispatch<UsersReducerActionType>

//getUsersThunkCreator
export const getUsers = (currentPage: number, pageSize: number): ThunkCreatorType => async (dispatch) => {
    dispatch(setIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setUsers(data.items))
    dispatch(setTotalCount(data.totalCount))
    dispatch(setIsFetching(false))

}
//change follow unfollow thunk creator
export const changeFollowUnfollow = (user: UsersDataType): ThunkCreatorType => async (dispatch) => {
    dispatch(setFollowingInProgress(true, user.id))
    if (user.followed) {
        const data = await usersAPI.deleteFollowUser(user.id)
        if (data.resultCode === 0) dispatch(changeFollow(user.id))
        dispatch(setFollowingInProgress(false, user.id))

    } else {
        const data = await usersAPI.addFollowUser(user.id)
        if (data.resultCode === 0) {
            dispatch(changeFollow(user.id))
        }
        dispatch(setFollowingInProgress(false, user.id))
    }
}