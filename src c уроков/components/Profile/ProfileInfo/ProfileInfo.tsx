import React from 'react';
import s from './ProfileInfo.module.css'

export const ProfileInfo = () => {
    return (
        <>
            <div>
                <img
                    src="https://bipbap.ru/wp-content/uploads/2017/04/priroda_kartinki_foto_03.jpg"
                    alt=""/>
            </div>
            <div className={s.descriptionBlock}> avatar+discription</div>
        </>
    )

}