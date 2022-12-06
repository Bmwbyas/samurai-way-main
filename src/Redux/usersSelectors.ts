import {AppStateType} from "./redux-store";
import {createSelector} from "reselect";
import {UsersDataType} from "./users-reducer";
//         usersPage: state.usersPage,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress

export const getDataUsers=(state:AppStateType)=>{
    return state.usersPage.usersData
}
// export const getDataUsersFiltred=(state:AppStateType)=>{
//     return getDataUsers(state).filter(u=>true)
// }
export const getUsersSuperSelector=createSelector(getDataUsers,(users:UsersDataType[])=>{
    return users.filter(u=>u)
}) 
export const getPageSize=(state:AppStateType)=>{
    return state.usersPage.getUsersParams.count
}
export const getTotalUsersCount=(state:AppStateType)=>{
    return state.usersPage.totalUsersCount
}
export const getCurrentPage=(state:AppStateType)=>{
    return state.usersPage.getUsersParams.page
}
export const getIsFetching=(state:AppStateType)=>{
    return state.usersPage.isFetching
}
export const getFollowingInProgress=(state:AppStateType)=>{
    return state.usersPage.followingInProgress
}

