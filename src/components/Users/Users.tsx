import React, {useEffect} from 'react';
import s from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";
import defauleUserPhoto from './../../assets/defaultAvatarUser.png'



const Users = (props:UsersPropsType) => {

    useEffect(() => {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response=>{
                props.setUsers(response.data.items)
            });
        }
    , [])

    return (
        <div className={s.Users} >
            {/*<button onClick={getUsers}>getUsers</button>*/}
            <div style={{padding:'10px',fontSize:'20px'}}>Users</div>
            {props.usersPage.usersData.map(user=>{
               const onClickHandler=()=>{
                   props.changeFollow(user.id)
               }

                return(
                    <div key={user.id} className={s.usersContainer}>
                        <div className={s.FollowBlock}>
                            <img className={s.img}
                                 src={user.photos.small?user.photos.small:defauleUserPhoto}
                                 alt="img Follow"/>
                            <button className={s.button} onClick={onClickHandler}>{user.followed?'Unfollow':'Follow'}</button>
                        </div>
                        <div className={s.containerUser}>
                            <div>
                                <div>{user.name}</div>
                                <div className={s.description}>{'user.description'}</div>
                            </div>
                            <div className={s.location}>
                                <div >{'user.location.country'}</div>
                                <div>{'user.location.city'}</div>
                            </div>
                        </div>

                    </div>
                )
            })}
            <button className={`${s.button} ${s.buttonShowMore}`} onClick={()=>{}}>Show more</button>
        </div>
    );
};

export default Users;