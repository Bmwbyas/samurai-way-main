import defaultAvatar from '../../assets/defaultAvatarUser.png'
export const vievAvatar=(avatar:string | null | undefined)=>{
    return avatar??defaultAvatar
}