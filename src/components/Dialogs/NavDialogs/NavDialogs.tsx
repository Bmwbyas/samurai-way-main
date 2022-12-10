import React from 'react';
import sProfilePage from "../../Profile/Profile.module.css";
import {NavLink} from "react-router-dom";
import {Divider, Row} from "antd";
import s from "../Dialogs.module.css";
import {TochedUser} from "../Dialog/TochedUser/TochedUser";
import {TouchedUsers} from "../../../Redux/dialogs-reduser";
import {routes} from "../../../Routes/Routes";

type NavDialogsType={
    tochedUsers:TouchedUsers[]
    removeTochedUser:(id:number)=>void
}
export const NavDialogs:React.FC<NavDialogsType> = ({tochedUsers,removeTochedUser}) => {

    const tochedUserDialog = tochedUsers.map(t => <TochedUser key={t.id} user={t} removeTochedUser={removeTochedUser}/>)
    return (

            <div className={sProfilePage.profileInfoContainer}>
                <NavLink to={routes.dialogs} style={{color: "black"}}>
                    <Row justify={"center"} className={s.allChat}>
                        All chat
                    </Row>
                </NavLink>
                <Divider style={{margin: 10}}/>
                {tochedUserDialog}
            </div>

    );
};

