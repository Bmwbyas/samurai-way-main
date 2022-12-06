import defaultAvatar from '../../assets/defaultAvatar.png'
export const viewAvatar=(avatar:string | null | undefined)=>{
    return avatar??defaultAvatar
}