import React from 'react';
import {addTochedUser, removeTochedUser, TouchedUsers,} from "../../Redux/dialogs-reduser";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {UsersDataType} from "../../Redux/users-reducer";


type MapStateToPropsType = {
    tochedUsers: TouchedUsers[]
    friends: UsersDataType[]
    myAvatar:string| null | undefined
    message:string
}
type MapDispatchToPropsType = typeof mapDispatchToProps
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        tochedUsers: state.dialogsPage.touchedUsers,
        friends:state.usersPage.friends,
        myAvatar:state.auth.avatar,
        message:state.dialogsPage.messagesData[state.dialogsPage.messagesData.length-1].message
    }
}
let mapDispatchToProps = {
    addTochedUser,
    removeTochedUser
}

export const DialogsContainer= compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs)

