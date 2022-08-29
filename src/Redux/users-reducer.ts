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

export const CHANGE_FOLLOW = 'CHANGE-FOLLOW';
export const SHOW_MORE_USERS = 'SHOW-MORE-USERS';

type FollowUserActionType = {
    type: 'CHANGE-FOLLOW',
    userID: number,
}
type ShowMoreUsers = {
    type: 'SHOW-MORE-USERS',
    users: UsersDataType[]
}
type SetCurrentPageType={
    type:'SET-CURRENT-PAGE'
    currentPage:number
}
type SetTotalcountType=ReturnType<typeof setTotalCount>
type SetIsFetchingType=ReturnType<typeof setIsFetching>
type UsersReducerActionType = FollowUserActionType
    | ShowMoreUsers
    |SetCurrentPageType
    |SetTotalcountType
    |SetIsFetchingType

export type UsersPageStateType = typeof initialState
let initialState = {
    usersData: [] as UsersDataType[],
    pageSize:5,
    totalUsersCount:0,
    currentPage:1,
    isFetching:false
}

export const usersReducer = (state = initialState, action: UsersReducerActionType): UsersPageStateType => {
    switch (action.type) {
        case CHANGE_FOLLOW: {
            return {
                ...state,
                usersData: state.usersData.map(user => user.id === action.userID ? {
                    ...user,
                    followed: !user.followed
                } : user)
            }
        }

        case SHOW_MORE_USERS: {
            return {...state, usersData: [ ...action.users]}
        }
        case 'SET-CURRENT-PAGE':{
            return {...state,currentPage:action.currentPage}
        }
        case 'SET-TOTAL-COUNT':{
            return {...state,totalUsersCount:action.totalCount}
        }
        case "SET-FETCHING":{
            return {...state,isFetching:action.isFetching}
        }
        default:
            return state;
    }
}

export const changeFollow = (userID: number):FollowUserActionType => ({type: CHANGE_FOLLOW, userID: userID})
export const setUsers = (users: UsersDataType[]):ShowMoreUsers => ({type: SHOW_MORE_USERS, users: users})
export const setCurrentPage = (currentPage:number):SetCurrentPageType => ({type:'SET-CURRENT-PAGE',currentPage})
export const setTotalCount=(totalCount:number)=>({type:'SET-TOTAL-COUNT',totalCount} as const)
export const setIsFetching=(isFetching:boolean)=>({type:'SET-FETCHING',isFetching} as const)
