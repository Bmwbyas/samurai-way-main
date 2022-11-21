import {profileAPI, usersAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {setMyAvatar, SetMyAvatarType} from "./auth-reducer";
export type ContactsType ={
    github: string|null
    vk: string|null
    facebook: string|null
    instagram: string|null
    twitter: string|null
    website: string|null
    youtube: string|null
    mainLink: string|null
}
export type PostDataType = {
    id: number
    message: string
    likesCount: number
}
export type UserProfileType = {
    userId?: number | undefined
    aboutMe?: string|undefined
    lookingForAJob?: boolean
    lookingForAJobDescription?: string|null
    fullName?: string|null
    contacts?: ContactsType
    photos?: {
        small: string|null
        large: string|null
    }
}


type AddPostActionType = ReturnType<typeof addPostActionCreator>

export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
type ChangeStatusActionCreator = ReturnType<typeof setProfileStatus>

type ProfileReducerActionType =
    AddPostActionType
    | ReturnType<typeof deletePost>
    | SetUserProfileActionType
    | ChangeStatusActionCreator
    | ReturnType<typeof savePhotoSuccess>
    | ReturnType<typeof updateProfileDataSuccess>
    | SetMyAvatarType

export type ProfilePageStateType = typeof initialState

let initialState = {
    postData: [
        {id: 1, message: "Hi,how are you?", likesCount: 10},
        {id: 2, message: "It's my first post", likesCount: 16},
    ] as PostDataType[],
    newStatus: '',
    profile: null as UserProfileType | null
}

export const profileReducer = (state = initialState, action: ProfileReducerActionType): ProfilePageStateType => {
    switch (action.type) {
        case 'PROFILE/ADD-POST':
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

        case "PROFILE/SET-USER-PROFILE": {
            return {
                ...state,
                profile: {...action.profile}
            }
        }
            ;
        case "PROFILE/SET-PROFILE-STATUS": {
            return {
                ...state,
                newStatus: action.status === null ? 'status not found' : action.status
            }
        }
            ;
        case "PROFILE/DELETE-POST": {
            return {...state, postData: state.postData.filter(p => p.id !== action.userID)}
        }
            ;
        case "PROFILE/SAVE-PHOTO": {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
            ;

        case "PROFILE/UPDATE-USER-PROFILE-DATA": {
            return {...state, profile: {...state.profile, ...action.profile}}
        }

        default:
            return state;
    }

}
//actions
export const deletePost = (userID: number) => ({type: 'PROFILE/DELETE-POST', userID: userID}) as const
export const setProfileStatus = (status: string) => ({type: 'PROFILE/SET-PROFILE-STATUS', status} as const)
export const addPostActionCreator = (newPost: string) => ({type: 'PROFILE/ADD-POST', newPost} as const)
export const setUserProfile = (profile: UserProfileType) => ({type: 'PROFILE/SET-USER-PROFILE', profile} as const)
export const savePhotoSuccess = (photos: { small: string, large: string }) => ({
    type: 'PROFILE/SAVE-PHOTO',
    photos
}) as const
export const updateProfileDataSuccess = (profile: UserProfileType) => ({
    type: 'PROFILE/UPDATE-USER-PROFILE-DATA',
    profile
} as const)

//thunk
type ThunkCreatorType = ThunkAction<void, AppStateType, unknown, ProfileReducerActionType>

export const getUserProfile = (userId: string): ThunkCreatorType => (dispatch, getState: () => AppStateType) => {
    if (!userId) userId = ' '
    // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
    const myId = getState().auth.id
    const myAvatar = getState().auth.avatar
    profileAPI.getProfile(userId)
        .then(response => {
            if (response.data.userId === myId && myAvatar === null) {
                dispatch(setMyAvatar(response.data.photos!.small))
            }

            dispatch(setUserProfile(response.data))
        });
}
export const getProfileStatus = (userId: string): ThunkCreatorType => async (dispatch) => {
    if (!userId) userId = ' '
    const response = await profileAPI.getStatus(userId)
    dispatch(setProfileStatus(response.data))

}
export const updateProfileStatus = (newStatus: string): ThunkCreatorType => async (dispatch) => {
    const response = await profileAPI.updateStatus(newStatus)
    if (response.data.resultCode === 0) {
        dispatch(setProfileStatus(newStatus))
    }
}
export const savePhoto = (value: File): ThunkCreatorType => async (dispatch) => {
    const response = await profileAPI.savePhoto(value)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const updateProfileData = (newProfileData: UserProfileType): ThunkCreatorType => async (dispatch,getState: () => AppStateType) => {
    try {
        const userId=getState().profilePage.profile?.userId
        const response = await profileAPI.updateUserData(newProfileData)
        if (response.data.resultCode === 0) {
            dispatch(updateProfileDataSuccess(newProfileData))
            // dispatch(getUserProfile(userId))
        }
    } catch (e) {

    }
}