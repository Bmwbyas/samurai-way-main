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
type UsersReducerActionType = FollowUserActionType | ShowMoreUsers
export type UsersPageStateType = typeof initialState
let initialState = {
    usersData: [] as UsersDataType[]

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
            // let moreUsers=[
            //     {id: 1, fullName: "sasha", followed: true, status: 'a am ok', description:'I am working now',location: {city: 'Minsk', country: 'Belarus'}},
            //     {id: 2, fullName: "masha", followed: true, status: 'she is ok',description:'I am shopping now', location: {city: 'Vitebsk', country: 'Belarus'}},
            //     {id: 3, fullName: "dasha", followed: false, status: 'senior', description:'be happy',location: {city: 'Kiev', country: 'Ukraine'}},
            //     {id: 4, fullName: "peter", followed: false, status: 'alcoholik',description:'Trololo', location: {city: 'Kiev', country: 'Ukraine'}},
            // ]
            return {...state, usersData: [...state.usersData, ...action.users]}
        }
        default:
            return state;
    }
}

export const changeFollowAC = (userID: number) => ({type: CHANGE_FOLLOW, userID: userID} as const)
export const setUsersAC = (users: UsersDataType[]) => ({type: SHOW_MORE_USERS, users: users} as const)
