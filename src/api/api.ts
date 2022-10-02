import axios from "axios";
import {UserProfileType} from "../Redux/profile-reduser";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': 'dc5ef090-3a81-4b2e-b560-18d471d90b82'}
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}
        &count=${pageSize}`)
            .then(response => response.data)
    },
    deleteUser(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    },
    addFollowUser(id: number) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    }
}
export const profileAPI={
    getProfile(userId: string) {
        return instance.get<UserProfileType>(`profile/${userId}`)
            // .then(response => response.data)
    },
    getStatus(userId:string){
        return instance.get<string>(`profile/status/${userId}`)
            // .then(response => response.data)
    },
    updateStatus(newstatus:string){
        return instance.put(`profile/status`,{status:newstatus})
    }
}
export type SendLoginPropertyType={email:string,password:string,rememberMe:boolean}
export const authAPI = {
    getAuthMe() {
        return instance.get(`auth/me`)
    },
    loginAuthMe(sendLogin:SendLoginPropertyType){
        return instance.post(`auth/login`,sendLogin)
    },
    logOutAuthMe(){
        return instance.delete(`auth/login`)
    }
}



