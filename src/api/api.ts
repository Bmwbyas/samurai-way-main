import axios from "axios";
import {UserProfileType, UserUpdateProfileType} from "../Redux/profile-reduser";
import {UsersDataType} from "../Redux/users-reducer";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': 'dc5ef090-3a81-4b2e-b560-18d471d90b82'}
})

export const usersAPI = {
    getUsers(currentPage?: number, pageSize?: number,isFriends?:boolean) {
        return instance.get<UsersResponseType>(`users?page=${currentPage}
        &count=${pageSize}&friend=${isFriends}`)
            .then(response => response.data)
    },
    deleteFollowUser(id: number) {
        return instance.delete<ResponseWithoutDataType>(`follow/${id}`)
            .then(response => response.data)
    },
    addFollowUser(id: number) {
        return instance.post<ResponseWithoutDataType>(`follow/${id}`)
            .then(response => response.data)
    }
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<UserProfileType>(`profile/${userId}`)
        // .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
        // .then(response => response.data)
    },
    updateStatus(newstatus: string) {
        return instance.put<ResponseWithoutDataType>(`profile/status`, {status: newstatus})
    },
    savePhoto(file: File) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<SavePhotoType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateUserData(newUserData: UserUpdateProfileType) {
        return instance.put<ResponseWithoutDataType>(`/profile`, newUserData)
    }

}

export const authAPI = {
    getAuthMe() {
        return instance.get<MeResponseType>(`auth/me`)
    },
    loginAuthMe(sendLogin: SendLoginPropertyType) {
        return instance.post<LoginResponseType>(`auth/login`, sendLogin)
    },
    logOutAuthMe() {
        return instance.delete<ResponseWithoutDataType>(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{ url: string }>('security/get-captcha-url')
    }
}


export type SavePhotoType={
    resultCode: number
    messages: string[]
    fieldsErrors?: Array<{ field: string, error: string }>
    data: { photos: { large: string, small: string } }
}
export type MeResponseType={
    resultCode: number
    messages: string[]
    fieldsErrors?: Array<{ field: string, error: string }>
    data: { id: number, email: string, login: string }
}
export type LoginResponseType={
    resultCode: number
    messages: string[]
    fieldsErrors?: Array<{ field: string, error: string }>
    data: { userId: number }
}
export type ResponseWithoutDataType = {
    resultCode: number
    messages: string[]
    fieldsErrors?: Array<{ field: string, error: string }>
    data: {  }
}
type UsersResponseType = {
    error: null
    items: UsersDataType[]
    totalCount: number
}
export type SendLoginPropertyType = { email: string, password: string, rememberMe: boolean, captcha?: string }
