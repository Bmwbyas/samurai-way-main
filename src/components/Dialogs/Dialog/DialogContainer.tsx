import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {Dialog} from "./Dialog";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {UsersDataType} from "../../../Redux/users-reducer";
import {addMessage, MessageDataType} from "../../../Redux/dialogs-reduser";

export class DialogAPI extends React.Component<DialogPropsType> {
    getDialog() {
        let userId = this.props.match.params.userId
        return this.props.friends.find(f=>f.id===+userId)
    }
    render() {

        const {name,photos}=this.getDialog()!
        console.log(this.getDialog())
        console.log('profile')
        return (
            <Dialog userName={name} avatar={photos.small}
                     myAvatar={this.props.myAvatar}
                    myUserName={this.props.myUserName} addMessage={this.props.addMessage}
                    dialogsData={this.props.dialogsData}
            />
        )
    }
}
type PathParamsType = {
    userId: string,
}
type MapStateToPropsType = {

    friends:UsersDataType[]
    myAvatar:string | null | undefined
    myUserName:string | null
    dialogsData:MessageDataType[]
}
type MapDispatchToPropsType = typeof mapDispatchToProps
export type DialogPropsType = MapStateToPropsType & RouteComponentProps<PathParamsType> & MapDispatchToPropsType
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        friends:state.usersPage.friends,
        myAvatar:state.auth.avatar,
        myUserName:state.auth.login,
        dialogsData:state.dialogsPage.messagesData
        }
}
let mapDispatchToProps = {
    addMessage
}

export const DialogContainer= compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(DialogAPI)

