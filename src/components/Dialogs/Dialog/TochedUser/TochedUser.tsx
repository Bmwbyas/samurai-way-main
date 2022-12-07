import React from 'react';
import {Row} from "antd";
import {NavLink} from "react-router-dom";
import s from './TochedUser.module.css'
import {routes} from "../../../../Routes/Routes";
import {TouchedUsers} from "../../../../Redux/dialogs-reduser";

type TochedUserType = {
    user:TouchedUsers
    removeTochedUser:(id:number)=>void
}
export const TochedUser: React.FC<TochedUserType> = ({user,removeTochedUser}) => {
const removeUserHandler=()=>{removeTochedUser(user.id)}
    return (
        <div className={s.container} onClick={removeUserHandler} >
            <NavLink style={{color:"black"}}   to={routes.toDialog + user.id}>
                <Row  className={s.name} > {user.name}</Row>
            </NavLink>
        </div>

    );
};

