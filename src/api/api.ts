import axios from "axios";


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


