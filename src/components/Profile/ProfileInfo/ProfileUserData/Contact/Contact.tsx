import React from "react";
import s from './Contact.module.css'
import {Tooltip} from "antd";

type ContactPropsType = {
    contactTitle: string
    contactValue: any
}
export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {



    return <div>

        {contactValue ?
            <a href={contactValue ? contactValue : '/404'} target="_blank">
                <img className={s.navlink} src={contactTitle} alt="contactTitle"/>
            </a>
            : <Tooltip  color={'#1369e1'} title="empty contact"><img style={{opacity:0.5}} className={s.navlink} src={contactTitle} alt="contactTitle"/></Tooltip >}


                {/*{contactValue === 'null' ? `${contactTitle}.com` : contactValue}*/}

            </div>
        }