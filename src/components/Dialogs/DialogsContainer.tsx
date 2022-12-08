import React from 'react';
import {addTochedUser, removeTochedUser, TouchedUsers,} from "../../Redux/dialogs-reduser";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getFriend, UsersDataType} from "../../Redux/users-reducer";
import {getUserProfile} from "../../Redux/profile-reduser";

export class DialogsContainerApi extends React.PureComponent<DialogsPropsType> {
    componentDidMount() {
        if (this.props.profileId !== this.props.myId) {
            this.props.getUserProfile(this.props.myId!)
            this.props.getFriend(true)
        }

        if (this.props.friends.length === 0) {
            this.props.getFriend(true)
        }
    }

    render() {
        return <Dialogs friends={this.props.friends} tochedUsers={this.props.tochedUsers}
                        message={this.props.message} myAvatar={this.props.myAvatar}
                        removeTochedUser={this.props.removeTochedUser}
                        addTochedUser={this.props.addTochedUser}/>
    }
}

type MapStateToPropsType = {
    tochedUsers: TouchedUsers[]
    friends: UsersDataType[]
    myAvatar: string | null | undefined
    message: string
    profileId:number | undefined
    myId:number | null
}
type MapDispatchToPropsType = typeof mapDispatchToProps
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        tochedUsers: state.dialogsPage.touchedUsers,
        friends: state.usersPage.friends,
        myAvatar: state.auth.avatar,
        message: state.dialogsPage.messagesData[state.dialogsPage.messagesData.length - 1].message,
        profileId:state.profilePage.profile?.userId,
        myId:state.auth.id
    }
}
let mapDispatchToProps = {
    addTochedUser,
    removeTochedUser,
    getFriend,
    getUserProfile,


}

export const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(DialogsContainerApi)

