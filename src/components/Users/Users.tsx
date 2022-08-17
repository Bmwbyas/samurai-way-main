import React from 'react';
import s from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";


const Users = (props:UsersPropsType) => {
if (props.usersPage.usersData.length===0)
    props.setUsers([
        {id: 1, fullName: "dimych", followed: true, status: 'boss',description:'I am looking for a Job right now', location: {city: 'Minsk', country: 'Belarus'}},
        {id: 2, fullName: "sveta", followed: true, status: 'sub boss',description:'I am so pretty', location: {city: 'Moskow', country: 'Russia'}},
        {id: 3, fullName: "sergei", followed: false, status: 'developer',description:'I like footboll', location: {city: 'Borisov', country: 'Belarus'}},
        {id: 4, fullName: "andrei", followed: false, status: 'junior',description:'I am free help you', location: {city: 'Grodno', country: 'Belarus'}},
    ])

    // const showMoreUsers=()=>{
    //     props.showMoreUsers()
    // }
    return (
        <div className={s.Users} >
            <div style={{padding:'10px',fontSize:'20px'}}>Users</div>
            {props.usersPage.usersData.map(user=>{
               const onClickHandler=()=>{
                   props.changeFollowed(user.id)
               }

                return(
                    <div key={user.id} className={s.usersContainer}>
                        <div className={s.FollowBlock}>
                            <img className={s.img}
                                 src="https://donttakefake.com/wp-content/uploads/2020/11/smile-dtf-magazine.png"
                                 alt="img Follow"/>
                            <button className={s.button} onClick={onClickHandler}>{user.followed?'Unfollow':'Follow'}</button>
                        </div>
                        <div className={s.containerUser}>
                            <div>
                                <div>{user.fullName}</div>
                                <div className={s.description}>{user.description}</div>
                            </div>
                            <div className={s.location}>
                                <div >{user.location.country}</div>
                                <div>{user.location.city}</div>
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