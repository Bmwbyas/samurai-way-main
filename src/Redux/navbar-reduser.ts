
export type NavBarStateType=typeof initialState
type NavBarFriendType={
    id:number
    name:string
}

let initialState={
    navBarFriends: [
        {id: 1, name: 'Andrew'},
        {id: 2, name: 'Sasha'},
        {id: 3, name: 'Sveta'},
    ] as NavBarFriendType[]
}
type navbarReducerActionType={

}
export const navbarReducer=(state=initialState,action:navbarReducerActionType):NavBarStateType=>{
    return state;
}