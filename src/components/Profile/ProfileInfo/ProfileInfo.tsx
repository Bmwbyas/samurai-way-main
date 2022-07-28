import React from 'react';
import s from './ProfileInfo.module.css'

export const ProfileInfo = () => {
    return (
        <>
            <div>
                <img className={s.img}
                    src="https://bipbap.ru/wp-content/uploads/2017/04/priroda_kartinki_foto_03.jpg"
                    alt="image Icon"/>
            </div>
            <div className={s.descriptionBlock}> avatar+discription</div>
        </>
    )

}