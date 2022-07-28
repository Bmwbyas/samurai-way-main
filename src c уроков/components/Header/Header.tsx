import React from 'react';
import './Header.module.css'
import s from './Header.module.css'

export const Header = () => {
    return (
        <header className={s.header}>
            <img
                src="https://play-lh.googleusercontent.com/ahJtMe0vfOlAu1XJVQ6rcaGrQBgtrEZQefHy7SXB7jpijKhu1Kkox90XDuH8RmcBOXNn"
                alt="logo"/>
        </header>
    );
}