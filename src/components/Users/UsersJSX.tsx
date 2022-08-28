import React from 'react';
import s from "./Users.module.css";
import defauleUserPhoto from "../../assets/defaultAvatarUser.png";
import {UsersDataType} from "../../Redux/users-reducer";

type UsersJsxPropsType = {
    totalUsersCount: number
    pageSize: number
    setCurrentPage: (p: number) => void
    currentPage: number
    usersData: UsersDataType[]
    changeFollowed: (id: number) => void
}

const UsersJsx = (props: UsersJsxPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div className={s.Users}>
            {/*<button onClick={this.getUsers}>getUsers</button>*/}
            <div style={{padding: '10px', fontSize: '20px'}}>Users</div>
            <div>
                {pages.map(p => {
                    return <span
                        key={p}
                        className={`${props.currentPage === p ? s.selectedPage : ''} ${s.span}`}
                        onClick={() => props.setCurrentPage(p)}
                    >{p}</span>
                })}

            </div>
            {props.usersData.map(user => {
                const onClickHandler = () => {
                    props.changeFollowed(user.id)
                }

                return (
                    <div key={user.id} className={s.usersContainer}>
                        <div className={s.FollowBlock}>
                            <img className={s.img}
                                 src={user.photos.small ? user.photos.small : defauleUserPhoto}
                                 alt="img Follow"/>
                            <button className={s.button}
                                    onClick={onClickHandler}>{user.followed ? 'Unfollow' : 'Follow'}</button>
                        </div>
                        <div className={s.containerUser}>
                            <div>
                                <div>{user.name}</div>
                                <div className={s.description}>{'user.description'}</div>
                            </div>
                            <div className={s.location}>
                                <div>{'user.location.country'}</div>
                                <div>{'user.location.city'}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <button className={`${s.button} ${s.buttonShowMore}`} onClick={() => {
            }}>Show more
            </button>
        </div>
    );
};

export default UsersJsx;
