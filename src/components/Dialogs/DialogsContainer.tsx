import React from 'react';
import {addTochedUser,  touchedUsers,} from "../../Redux/dialogs-reduser";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {UsersDataType} from "../../Redux/users-reducer";


type MapStateToPropsType = {
    tochedUsers: touchedUsers[]
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
        message:state.dialogsPage.messagesData[0].message
    }
}
let mapDispatchToProps = {
    addTochedUser
}

export const DialogsContainer= compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs)

