import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {Dialog} from "./Dialog";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {getFriend, UsersDataType} from "../../../Redux/users-reducer";
import {addMessage, MessageDataType, removeTochedUser, TouchedUsers} from "../../../Redux/dialogs-reduser";
import {getUserProfile} from "../../../Redux/profile-reduser";


export class DialogAPI extends React.Component<DialogPropsType> {

    getDialog() {
        let userId = this.props.match.params.userId
        return this.props.friends.find(f => f.id === +userId)
    }

    componentDidMount() {
        if (this.props.friends.length === 0) {
            this.props.getUserProfile(this.props.myId!)
            this.props.getFriend(true)
        }
    }


    render() {
        const currentUser = this.getDialog()
        let name = ''
        let avatar = '' as string | null
        if (currentUser !== undefined) {
            name = currentUser.name
            avatar = currentUser.photos.small
        }


        console.log('dialog')
        return (
            <Dialog userName={name} avatar={avatar}
                    myAvatar={this.props.myAvatar}
                    myUserName={this.props.myUserName} addMessage={this.props.addMessage}
                    dialogsData={this.props.dialogsData} tochedUsers={this.props.tochedUsers}
                    removeTochedUser={this.props.removeTochedUser}
            />
        )
    }
}

type PathParamsType = {
    userId: string,
}
type MapStateToPropsType = {

    friends: UsersDataType[]
    myAvatar: string | null | undefined
    myUserName: string | null
    dialogsData: MessageDataType[]
    tochedUsers: TouchedUsers[]
    profileId: number | undefined
    myId: number | null

}
type MapDispatchToPropsType = typeof mapDispatchToProps
export type DialogPropsType = MapStateToPropsType & RouteComponentProps<PathParamsType> & MapDispatchToPropsType
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        friends: state.usersPage.friends,
        myAvatar: state.auth.avatar,
        myUserName: state.auth.login,
        dialogsData: state.dialogsPage.messagesData,
        tochedUsers: state.dialogsPage.touchedUsers,
        profileId: state.profilePage.profile?.userId,
        myId: state.auth.id
    }
}
let mapDispatchToProps = {
    addMessage, removeTochedUser, getUserProfile, getFriend
}

export const DialogContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(DialogAPI)

