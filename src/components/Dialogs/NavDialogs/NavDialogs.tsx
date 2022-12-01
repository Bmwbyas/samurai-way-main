import React from 'react';
import sProfilePage from "../../Profile/ProfileInfo/ProfileInfo.module.css";
import {NavLink} from "react-router-dom";
import {Anchor, Divider, Row} from "antd";
import s from "../Dialogs.module.css";
import {TochedUser} from "../Dialog/TochedUser/TochedUser";
import {TouchedUsers} from "../../../Redux/dialogs-reduser";
type NavDialogsType={
    tochedUsers:TouchedUsers[]
}
export const NavDialogs:React.FC<NavDialogsType> = ({tochedUsers}) => {

    const tochedUserDialog = tochedUsers.map(t => <TochedUser key={t.id} id={t.id} name={t.name}/>)
    return (
        <Anchor >
            <div className={sProfilePage.profileInfoContainer}>
                <NavLink to={'/dialogs'} style={{color: "black"}}>
                    <Row justify={"center"} className={s.allChat}>
                        All chat
                    </Row>
                </NavLink>
                <Divider style={{margin: 10}}/>
                {tochedUserDialog}
            </div>
         </Anchor>
    );
};

