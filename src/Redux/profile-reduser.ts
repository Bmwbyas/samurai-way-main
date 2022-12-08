import {profileAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {setMyAvatar, SetMyAvatarType} from "./auth-reducer";
import {v1} from "uuid";

export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PostDataType = {
    id: string
    message: string
    likesCount: number
}
export type CommentType = {
    id: string
    comment: string
    like: number
}
export type CommentsStateType = {
    [key: string]: CommentType[]
}
export type UserProfileType = {
    userId: number | undefined
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: ContactsType
    photos: {
        small: string | null
        large: string | null
    }
}
export type UserUpdateProfileType = {
    userId?: number | undefined
    aboutMe?: string | undefined
    lookingForAJob?: boolean
    lookingForAJobDescription?: string | null
    fullName?: string | null
    contacts?: ContactsType
    photos?: {
        small?: string | null
        large?: string | null
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
    | SetMyAvatarType
    | ReturnType<typeof addComment>
    | ReturnType<typeof toggleLike>

export type ProfilePageStateType = typeof initialState
const id1 = v1()
const id2 = v1()
let initialState = {
    postData: [
        {id: id1, message: "Hi,how are you?", likesCount: 10},
        {id: id2, message: "It's my first post", likesCount: 16},
    ] as PostDataType[],
    commentData: {
        [id1]: [{id: v1(), comment: 'blabla', like: 1}, {id: v1(), comment: 'trololo', like: 2}],
        [id2]: [{id: v1(), comment: 'oi', like: 0}, {id: v1(), comment: 'tili', like: 3}]
    } as CommentsStateType,
    newStatus: '',
    profile: null as UserProfileType | null

}

export const profileReducer = (state = initialState, action: ProfileReducerActionType): ProfilePageStateType => {
    switch (action.type) {
        case 'PROFILE/ADD-POST':
            let newPost = {
                id: v1(),
                message: action.newPost,
                likesCount: 0
            }
            return {
                ...state,
                postData: [newPost, ...state.postData],
                commentData: {
                    ...state.commentData,
                    [newPost.id]: []
                }
            }

        case "PROFILE/SET-USER-PROFILE":
            return {
                ...state,
                profile: {...action.profile}
            }


        case "PROFILE/SET-PROFILE-STATUS":
            return {
                ...state,
                newStatus: action.status === null ? 'status not found' : action.status
            }


        case "PROFILE/DELETE-POST":
            return {...state, postData: state.postData.filter(p => p.id !== action.userID)}


        case "PROFILE/SAVE-PHOTO":

            return {...state, profile: action.payload}
        case "PROFILE/ADD-COMMENT":
            const newComment: CommentType = {id: v1(), comment: action.payload.comment, like: 0}
            return {
                ...state,
                commentData: {
                    ...state.commentData,
                    [action.payload.postId]: [...state.commentData[action.payload.postId], newComment]
                }
            }
        case "PROFILE/TOGGLE-LIKE":
            if (action.payload.id) {
                return {
                    ...state,
                    commentData: {
                        ...state.commentData, [action.payload.postId]: state.commentData[action.payload.postId]
                            .map(c => c.id === action.payload.id ? {...c, like: c.like + action.payload.likeValue} : c)
                    }
                }
            } else {
                return {
                    ...state,
                    postData: state.postData.map(p => p.id === action.payload.postId ? {
                        ...p,
                        likesCount: p.likesCount + action.payload.likeValue
                    } : p)
                }
            }

        default:
            return state;
    }

}
//actions
export const deletePost = (userID: string) => ({type: 'PROFILE/DELETE-POST', userID}) as const

export const setProfileStatus = (status: string) => ({type: 'PROFILE/SET-PROFILE-STATUS', status} as const)
export const addPostActionCreator = (newPost: string) => ({type: 'PROFILE/ADD-POST', newPost} as const)
export const setUserProfile = (profile: UserProfileType) => ({type: 'PROFILE/SET-USER-PROFILE', profile} as const)
export const savePhotoSuccess = (payload: UserProfileType) => ({
    type: 'PROFILE/SAVE-PHOTO',
    payload
}) as const
export const addComment = (payload: { postId: string, comment: string }) => ({
    type: 'PROFILE/ADD-COMMENT',
    payload
}) as const
export const toggleLike = (payload: { postId: string, id?: string, likeValue: number }) => ({
    type: 'PROFILE/TOGGLE-LIKE', payload
}) as const


//thunk
type ThunkCreatorType = ThunkAction<void, AppStateType, unknown, ProfileReducerActionType>

export const getUserProfile = (userId: number): ThunkCreatorType => async (dispatch, getState: () => AppStateType) => {
    const myId = getState().auth.id
    if (!userId) userId = myId!
    const response = await profileAPI.getProfile(userId)

    if (response.data.userId === myId) {
        dispatch(setMyAvatar(response.data.photos.small ?? ''))
    }
    dispatch(setUserProfile(response.data))
}
export const getProfileStatus = (userId: number): ThunkCreatorType => async (dispatch) => {

    const response = await profileAPI.getStatus(userId)
    dispatch(setProfileStatus(response.data))


}
export const updateProfileStatus = (newStatus: string): ThunkCreatorType => async (dispatch) => {
    const response = await profileAPI.updateStatus(newStatus)
    if (response.data.resultCode === 0) {
        dispatch(setProfileStatus(newStatus))
    }
}
export const savePhoto = (value: File): ThunkCreatorType => async (dispatch, getState: () => AppStateType) => {
    const response = await profileAPI.savePhoto(value)
    if (response.data.resultCode === 0) {
        const myId = getState().auth.id
        const oldProfile = getState().profilePage.profile
        const newProfile = {...oldProfile!, photos: response.data.data.photos}

        if (newProfile.userId === myId) {
            dispatch(setMyAvatar(response.data.data.photos.small))
        }
        dispatch(savePhotoSuccess(newProfile))
    }
}
export const updateProfileData = (newProfileData: UserUpdateProfileType): ThunkCreatorType => async (dispatch, getState: () => AppStateType) => {
    try {
        const userId = getState().profilePage.profile!.userId
        const response = await profileAPI.updateUserData(newProfileData)
        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId!))
        }
    } catch (e) {

    }
}