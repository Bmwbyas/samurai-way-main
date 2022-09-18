import {usersAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

export type PostDataType = {
    id: number
    message: string
    likesCount: number
}
export type UserProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}

export const ADD_POST = 'ADD-POST';
export const UPDATE_NEW_POSTS_TEXT = 'UPDATE-NEW-POSTS-TEXT';

type AddPostActionType = {
    type: 'ADD-POST'
}
type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POSTS-TEXT'
    newText: string
}
export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
type ChangeStatusActionCreator=ReturnType<typeof changeStatus>
type ProfileReducerActionType = AddPostActionType
    | UpdateNewPostTextActionType
    |SetUserProfileActionType
    |ChangeStatusActionCreator

export type ProfilePageStateType = typeof initialState

let initialState = {
    postData: [
        {id: 1, message: "Hi,how are you?", likesCount: 10},
        {id: 2, message: "It's my first post", likesCount: 16},
    ] as PostDataType[],
    newPostText: '',
    newStatus:'status',
    profile: null as UserProfileType | null
}

export const profileReducer = (state = initialState, action: ProfileReducerActionType): ProfilePageStateType => {
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
                newPostText: '',
                postData: [newPost, ...state.postData]
            };
        case UPDATE_NEW_POSTS_TEXT:
            // state.newPostText = action.newText
            return {
                ...state,
                newPostText: action.newText
            };
        case "SET-USER-PROFILE": {
            return {
                ...state,
                profile: {...action.profile}
            }
        }
        case "CHANGE-STATUS":{
            return {
                ...state,
                newStatus: action.status
            }
        }

        default:
            return state;
    }

}
export const changeStatus=(status:string)=>({type:'CHANGE-STATUS',status} as const)
export const addPostActionCreator = () => ({type: ADD_POST} as const)
export const onPostChangeActionCreator = (text: string) => ({type: UPDATE_NEW_POSTS_TEXT, newText: text} as const)
export const setUserProfile = (profile: UserProfileType) => ({type: 'SET-USER-PROFILE', profile} as const)

type ThunkCreatorType = ThunkAction<any, AppStateType, unknown, ProfileReducerActionType>

//getUserProfileThunkCreator
export const getUserProfile = (userId: string): ThunkCreatorType => (dispatch) => {
    if (!userId) userId = ' '
    // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
    usersAPI.getProfile(userId)
        .then(data => {
            dispatch(setUserProfile(data))
        });
}