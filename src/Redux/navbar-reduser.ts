import {navbarPageType} from "./redux-store";

let initialState:navbarPageType={
    navBarFriends: [
        {id: 1, name: 'Andrew'},
        {id: 2, name: 'Sasha'},
        {id: 3, name: 'Sveta'},
    ]
}
type navbarReducerActionType={

}
export const navbarReducer=(state=initialState,action:navbarReducerActionType)=>{
    return state;
}