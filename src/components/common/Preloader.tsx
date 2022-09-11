import React from 'react';
import preloader from "../../assets/defaultAvatarUser.png";

export const Preloader = () => {
    return (
        <div>
            <img style={{width:'100px',height:'100px'}} src={preloader}/>
        </div>
    );
};

