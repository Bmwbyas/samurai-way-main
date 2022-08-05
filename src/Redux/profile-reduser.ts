

export const ADD_POST = 'ADD-POST';
export const UPDATE_NEW_POSTS_TEXT = 'UPDATENEWPOSTSTEXT';

let initialState={
    postData: [
        {id: 1, message: "Hi,how are you?", likesCount: 10},
        {id: 2, message: "It's my first post", likesCount: 16},
    ],
        newPostText: ''
}

export const profileReduser=(state=initialState,action:any)=>{
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: state.newPostText,
                likesCount: 0
            }
            state.postData.unshift(newPost)
            state.newPostText = ''
            return state;
        case UPDATE_NEW_POSTS_TEXT:
            state.newPostText = action.newText
            return state;
        default: return state;
    }

}
export const addPostActionCreator = () => ({type: ADD_POST})
export const onPostChangeActionCreator = (text:string) => ({type: UPDATE_NEW_POSTS_TEXT, newText:text})