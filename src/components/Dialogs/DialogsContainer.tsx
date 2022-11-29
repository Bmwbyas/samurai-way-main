import React from 'react';
import { DialogsPageStateType,} from "../../Redux/dialogs-reduser";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {UsersDataType} from "../../Redux/users-reducer";


type MapStateToPropsType = {
    dialogsPage: DialogsPageStateType
    friends: UsersDataType[]
    myAvatar:string| null | undefined
}
type MapDispatchToPropsType = typeof mapDispatchToProps
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        friends:state.usersPage.friends,
        myAvatar:state.auth.avatar
    }
}
let mapDispatchToProps = {

}

export const DialogsContainer= compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs)

