import React, {ChangeEvent} from 'react';

type ProfileStatusPropsType = {
    newStatus: string
    updateProfileStatus: (status: string) => void
}
type ProfileStatusStateType = {
    status: string
    editStatus: boolean
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state: ProfileStatusStateType = {
        status: this.props.newStatus,
        editStatus: false
    }
    activateEditMode = () => {
        this.state.editStatus = true
        this.forceUpdate()
    }

    disableEditMode() {
        this.setState({
            editStatus: false,
        })
        console.log(this.state.status)
        this.props.updateProfileStatus(this.state.status)
    }

    changeInputStatus = (e: ChangeEvent<HTMLInputElement>) => {

        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: ProfileStatusStateType) {
        if (prevProps.newStatus !== this.props.newStatus) {
            this.setState({status: this.props.newStatus})
        }
    }

    render() {
        console.log(this.props.newStatus)
        return (
            <div>
                {this.state.editStatus
                    ? <input
                        value={this.state.status}
                        autoFocus={true}
                        onChange={this.changeInputStatus}
                        onBlur={this.disableEditMode.bind(this)}
                    />
                    : <div onDoubleClick={this.activateEditMode}><span>{this.state.status}</span></div>}
            </div>
        );
    };
}
