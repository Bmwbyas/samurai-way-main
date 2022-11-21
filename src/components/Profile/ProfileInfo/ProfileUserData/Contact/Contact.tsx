import React from "react";
import {NavLink} from "react-router-dom";
import s from './Contact.module.css'

type ContactPropsType = {
    contactTitle: string
    contactValue: any
}
export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {

    return <div>
        <a  href={contactValue?contactValue:'/404'} target="_blank">
            <img className={s.navlink} src={contactTitle} alt="contactTitle"/>
        </a>

        {/*{contactValue === 'null' ? `${contactTitle}.com` : contactValue}*/}

    </div>
}