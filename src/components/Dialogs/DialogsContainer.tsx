import React from 'react';


import {
    addMessageActionCreator,
    DialogsPageStateType,
    onChangeMessageHandlerActionCreator
} from "../../Redux/dialogs-reduser";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    dialogsPage: DialogsPageStateType
}
type MapDispatchToPropsType = {
    addMessage: () => void
    updateNewMessage: (text: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator())
        },
        updateNewMessage: (text: string) => {
            dispatch(onChangeMessageHandlerActionCreator(text))
        }
    }
}
export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);