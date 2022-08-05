import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import { StoreType} from "../../Redux/Store";

type navBarPropsType = {
    store:StoreType
}

export const Navbar = (props: navBarPropsType) => {

    return (
        <nav className={s.nav}>
            <div className={s.item}><NavLink to="/profile" activeClassName={s.active}>Profile</NavLink></div>
            <div className={s.item}><NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink></div>
            <div className={s.item}><NavLink to="/news" activeClassName={s.active}>News</NavLink></div>
            <div className={s.item}><NavLink to="/music" activeClassName={s.active}>Music</NavLink></div>
            <div className={s.item}><NavLink to="/setting" activeClassName={s.active}>Setting</NavLink></div>

            <div className={s.friends}>
                <div className={s.item}>Friends</div>
                <div className={s.friendsList}>

                    {props.store._state.navbarData.navBarFriends.map((el,index) => {
                        return (<div key={index} className={s.friendsItem}>
                            <div className={s.circleFriends}></div>
                            {el.name}
                        </div>)
                    })}
                </div>
            </div>

        </nav>
    )
        ;

}