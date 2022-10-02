import {AppStateType} from "./redux-store";
//         usersPage: state.usersPage,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
export const getDataUsers=(state:AppStateType)=>{
    return state.usersPage.usersData
}
export const getPageSize=(state:AppStateType)=>{
    return state.usersPage.pageSize
}
export const getTotalUsersCount=(state:AppStateType)=>{
    return state.usersPage.totalUsersCount
}
export const getCurrentPage=(state:AppStateType)=>{
    return state.usersPage.currentPage
}
export const getIsFetching=(state:AppStateType)=>{
    return state.usersPage.isFetching
}
export const getFollowingInProgress=(state:AppStateType)=>{
    return state.usersPage.followingInProgress
}

