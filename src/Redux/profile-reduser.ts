import {profileAPI, usersAPI} from "../api/api";
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

type AddPostActionType = ReturnType<typeof addPostActionCreator>
type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POSTS-TEXT'
    newText: string
}
export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
type ChangeStatusActionCreator = ReturnType<typeof setProfileStatus>

type ProfileReducerActionType = AddPostActionType
    | UpdateNewPostTextActionType
    | SetUserProfileActionType
    | ChangeStatusActionCreator

export type ProfilePageStateType = typeof initialState

let initialState = {
    postData: [
        {id: 1, message: "Hi,how are you?", likesCount: 10},
        {id: 2, message: "It's my first post", likesCount: 16},
    ] as PostDataType[],
    newStatus: 'status',
    profile: null as UserProfileType | null
}

export const profileReducer = (state = initialState, action: ProfileReducerActionType): ProfilePageStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.newPost,
                likesCount: 0
            }
            // state.postData.unshift(newPost)
            // state.newPostText = ''
            return {
                ...state,
                postData: [newPost, ...state.postData]
            };
        // case UPDATE_NEW_POSTS_TEXT:
        //     // state.newPostText = action.newText
        //     return {
        //         ...state,
        //         newPostText: action.newText
        //     };
        case "SET-USER-PROFILE": {
            return {
                ...state,
                profile: {...action.profile}
            }
        }
            ;
        case "SET-PROFILE-STATUS": {
            return {
                ...state,
                newStatus: action.status
            }
        }
        default:
            return state;
    }

}
export const setProfileStatus = (status: string) => ({type: 'SET-PROFILE-STATUS', status} as const)
export const addPostActionCreator = (newPost: string) => ({type: ADD_POST, newPost} as const)
export const onPostChangeActionCreator = (text: string) => ({type: UPDATE_NEW_POSTS_TEXT, newText: text} as const)
export const setUserProfile = (profile: UserProfileType) => ({type: 'SET-USER-PROFILE', profile} as const)


type ThunkCreatorType = ThunkAction<void, AppStateType, unknown, ProfileReducerActionType>

//getUserProfileThunkCreator
export const getUserProfile = (userId: string): ThunkCreatorType => (dispatch) => {
    if (!userId) userId = ' '
    // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
    profileAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        });
}
//getProfileStatusThunkCreator
export const getProfileStatus = (userId: string): ThunkCreatorType => (dispatch) => {
    if (!userId) userId = ' '
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setProfileStatus(response.data))
        })
}
//updateProfileStatusThunkCreator
export const updateProfileStatus = (newStatus: string): ThunkCreatorType => (dispatch) => {
    profileAPI.updateStatus(newStatus)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setProfileStatus(newStatus))
            }
        })
}