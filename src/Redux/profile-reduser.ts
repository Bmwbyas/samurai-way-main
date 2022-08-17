
export type PostDataType = {
    id: number
    message: string
    likesCount: number
}

export const ADD_POST = 'ADD-POST';
export const UPDATE_NEW_POSTS_TEXT = 'UPDATE-NEW-POSTS-TEXT';

type AddPostActionType={
    type:'ADD-POST'
}
type UpdateNewPostTextActionType={
    type:'UPDATE-NEW-POSTS-TEXT'
    newText:string
}
type ProfileReducerActionType=AddPostActionType|UpdateNewPostTextActionType

export type ProfilePageStateType=typeof initialState

let initialState={
    postData: [
        {id: 1, message: "Hi,how are you?", likesCount: 10},
        {id: 2, message: "It's my first post", likesCount: 16},
    ] as PostDataType[] ,
        newPostText: ''
}

export const profileReducer=(state=initialState,action:ProfileReducerActionType):ProfilePageStateType=>{
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: state.newPostText,
                likesCount: 0
            }
            // state.postData.unshift(newPost)
            // state.newPostText = ''
            return {
                ...state,
                newPostText:'',
                postData:[newPost,...state.postData]
            };
        case UPDATE_NEW_POSTS_TEXT:
            // state.newPostText = action.newText
            return {
                ...state,
                newPostText:action.newText
            };
        default: return state;
    }

}
export const addPostActionCreator = () => ({type: ADD_POST} as const)
export const onPostChangeActionCreator = (text:string) => ({type: UPDATE_NEW_POSTS_TEXT, newText:text} as const)