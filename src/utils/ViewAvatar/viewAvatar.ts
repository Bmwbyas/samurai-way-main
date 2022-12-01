import defaultAvatar from '../../assets/defaultAvatarUser.png'
export const viewAvatar=(avatar:string | null | undefined)=>{
    return avatar??defaultAvatar
}