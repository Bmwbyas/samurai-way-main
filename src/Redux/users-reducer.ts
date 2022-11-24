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
type SetUsers = {
    type: 'USER/SET-USERS',
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
    | SetUsers
    | SetCurrentPageType
    | SetTotalcountType
    | SetIsFetchingType
    | FollowingInProgressType
    | ReturnType<typeof addFriend>
    | ReturnType<typeof deleteFriend>
    | ReturnType<typeof setFriend>


export type UsersPageStateType = typeof initialState
let initialState = {
    usersData: [] as UsersDataType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[],
    friends: [] as UsersDataType[]
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
            return {...state, usersData: [...action.users]}

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
        return {...state,friends: action.users}
        default:
            return state;
    }
}

export const changeFollow = (userID: number): FollowUserActionType => ({type: 'USER/CHANGE-FOLLOW', userID: userID})
export const setUsers = (users: UsersDataType[]): SetUsers => ({type: 'USER/SET-USERS', users: users})
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
export const getFriend = (currentPage?: number, pageSize?: number): ThunkCreatorType => async (dispatch) => {

    const response = await usersAPI.getUsers(currentPage, pageSize, true)
    dispatch(setFriend(response.items))

}
//change follow unfollow thunk creator
export const changeFollowUnfollow = (user: UsersDataType): ThunkCreatorType => async (dispatch) => {
    dispatch(setFollowingInProgress(true, user.id))
    if (user.followed) {
        const data = await usersAPI.deleteFollowUser(user.id)
        if (data.resultCode === 0) dispatch(changeFollow(user.id))
        dispatch(setFollowingInProgress(false, user.id))
        dispatch(deleteFriend(user.id))

    } else {
        const data = await usersAPI.addFollowUser(user.id)
        if (data.resultCode === 0) {
            dispatch(changeFollow(user.id))
            dispatch(addFriend(user))

        }
        dispatch(setFollowingInProgress(false, user.id))
    }
}